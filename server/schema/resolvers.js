const { PubSub, withFilter } = require("apollo-server");
const Task = require("../models/task");
const Users = require('../models/user'); 

//Subscription stuff
const pubsub = new PubSub();
const TASK_COMPLETED_TOGGLED = "TASK_COMPLETED_TOGGLED";
const USER_TASK_ADDED_OR_DELETED = "USER_TASK_ADDED_OR_DELETED";

const resolvers = {
  Query: {
    users: () => {
      const users = Users.map(({ id, name }) => ({
        id,
        name,
        tasks: Task.find({ userId: id })
      }));
      return users;
    },
    user: async (root, { id }) => {
      const [user] = Users.filter(user => user.id == id);
      const  tasks = await Task.find({});
      const userTasks = tasks.filter(task => task.userId == id);
      return { ...user, tasks: userTasks };
    },
    task: (root, { id }) => {
      return Task.findById(id);
    }
  },
  Mutation: {
    createTask: async (root, { title, userId }) => {
      const task = new Task({
        title,
        userId,
        completed: false,
        created: new Date().toDateString()
      });
      const tasks = await Task.find({});
      pubsub.publish(USER_TASK_ADDED_OR_DELETED, {
        userTasksAddedOrDeleted: [
          ...tasks.filter(task => task.userId == userId),
          task
        ]
      });
      return task.save();
    },
    deleteTask: async (root, { id }) => {
      //We fetch all tasks   
      const tasks = await Task.find({});
      //get get a reference to the userId
      const [{ userId }] = tasks.filter( task => task.id == id);
      //Optimistic approach, we publish before saving changes to db   
      pubsub.publish(USER_TASK_ADDED_OR_DELETED, {
        userTasksAddedOrDeleted: tasks.filter(task => task.userId == userId && task.id != id )
      });
      //We finally make the changes, and return the deleted task
      return Task.findByIdAndDelete(id);
    },
    toggleTaskCompleted: async (root, { id }) => {
      let task = await Task.findById(id);
      task.completed = !task.completed;
      pubsub.publish(TASK_COMPLETED_TOGGLED, {
        taskCompletedToggled: task
      });
      return Task.findByIdAndUpdate(id, task, { new : true });
    }
  },
  //Note on the filtering subscriptions: notice how the withFilter function works, it takes 2 functions as arguments, the first is gonna be the asyncIterator, and the second one a function that must return a boolean. This last one is the one charged of the filtering, if it returns true the subscription will work, otherwise no. This callback has access to both, payload (whats coming from the pubsub.publish()) and also the variables on the subscription query.
  Subscription: {
    taskCompletedToggled: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(TASK_COMPLETED_TOGGLED),
        (payload, variables) => {
          return payload.taskCompletedToggled.id == variables.id;
        }
      )
    },
    userTasksAddedOrDeleted: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(USER_TASK_ADDED_OR_DELETED),
        (payload, variables) => {
          const userId = payload.userTasksAddedOrDeleted.reduce((acc, elem) => {
            if (acc !== 0 && acc !== acc) console.error("userId not matching");
            acc = elem.userId;
            return acc;
          }, 0);
          return userId == variables.id;
        }
      )
    }
  }
};

module.exports = resolvers;
