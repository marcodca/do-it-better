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

const resolvers = {
  Query: {
    users: () => {
        const users = usersArr.map( ({id, name}) => ({
            id,
            name,
            tasks : tasksArr.filter(task => task.userId == id) 
        }))
        return users
    },
    user: (root, { id }) => {
      const user =  usersArr.filter(user => user.id == id)[0];
      const tasks = tasksArr.filter(task => task.userId == id) 
      return {...user, tasks}
    },
    task: (root, { id }) => tasksArr.filter(task => task.id === id)[0]
  },
  Mutation: {
    createTask: (root, { id, title, userId, completed, created }) => {
      tasksArr.push({ id, title, userId, completed, created });
      return tasksArr[tasksArr.length - 1];
    },
    deleteTask: (root, { id }) => {
      tasksArr = tasksArr.filter(task => task.id !== id);
      return true;
    },
    toggleTaskCompleted: (root, { id }) => {
      const taskRef = tasksArr.filter(task => task.id == id)[0];
      taskRef.completed = !taskRef.completed;
      return taskRef;
    }
  }
};

export default resolvers;
