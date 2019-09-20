import { PubSub, withFilter } from "apollo-server";

let tasksArr = [
  {
    id: 1,
    title: "Be happy",
    userId: 3,
    completed: false,
    created: "long ago"
  },
  {
    id: 2,
    title: "be strong",
    userId: 2,
    completed: true,
    created: "some time ago"
  },
  {
    id: 3,
    title: "find yourself",
    userId: 1,
    completed: false,
    created: "a while ago"
  },
  { id: 4, title: "be kind", userId: 2, completed: false, created: "ages ago" },
  {
    id: 5,
    title: "be great",
    userId: 3,
    completed: false,
    created: "not long ago"
  }
];

let usersArr = [
  { id: 1, name: "Marco" },
  { id: 2, name: "Rodrigo" },
  { id: 3, name: "Felix" }
];

const pubsub = new PubSub();
const TASK_COMPLETED_TOGGLED = "TASK_COMPLETED_TOGGLED";
const USER_TASK_ADDED_OR_DELETED = "USER_TASK_ADDED_OR_DELETED";

const resolvers = {
  Query: {
    users: () => {
      const users = usersArr.map(({ id, name }) => ({
        id,
        name,
        tasks: tasksArr.filter(task => task.userId == id)
      }));
      return users;
    },
    user: (root, { id }) => {
      const user = usersArr.filter(user => user.id == id)[0];
      const tasks = tasksArr.filter(task => task.userId == id);
      return { ...user, tasks };
    },
    task: (root, { id }) => tasksArr.filter(task => task.id === id)[0]
  },
  Mutation: {
    createTask: (root, { id, title, userId, completed, created }) => {
      tasksArr.push({ id, title, userId, completed, created });
      return tasksArr[tasksArr.length - 1];
    },
    deleteTask: (root, { id }) => {
      //reference to the task to be deleted
      const [taskRef] = tasksArr.filter(task => task.id == id);
      console.log(taskRef)
      //we modify the data
      tasksArr = tasksArr.filter(task => task.id != id);
      //we make the publishing
      //MAKE IT MORE EFFICIENT HERE!  
      pubsub.publish(USER_TASK_ADDED_OR_DELETED, {
        userTasksAddedOrDeleted: tasksArr.filter(task => task.userId == taskRef.userId)
      });
      //if all went okay, return the deleted task
      return taskRef;
    },
    toggleTaskCompleted: (root, { id }) => {
      const taskRef = tasksArr.filter(task => task.id == id)[0];
      taskRef.completed = !taskRef.completed;
      pubsub.publish(TASK_COMPLETED_TOGGLED, {
        taskCompletedToggled: taskRef
      });
      return taskRef;
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
                if (acc !== 0 || acc !== acc) console.error('userId not matching')
                acc = elem.userId;
                return acc
            }, 0)
            return (userId == variables.id)
          }
      )
    }
  }
};

export default resolvers;
