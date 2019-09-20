
const tasksArr = [
{    id: 1,
    title: 'Be happy',
    userId: 3,
    completed: false,
    created: 'long ago',
},
{    id: 2,
    title: 'be strong',
    userId: 2,
    completed: true,
    created: 'some time ago',
},
{    id: 3,
    title: 'find yourself',
    userId: 1,
    completed: false,
    created: 'a while ago',
},
{    id: 4,
    title: 'be kind',
    userId: 2,
    completed: false,
    created: 'ages ago',
},
{    id: 5,
    title: 'be great',
    userId: 3,
    completed: false,
    created: 'not long ago',
},
]

const usersArr = [
    {id:1,
    name: 'Marco',
    tasks:  tasksArr.filter(task => task.userId === 1)
},
    {id:2,
    name: 'Rodrigo',
    tasks: tasksArr.filter(task => task.userId === 2)
},
    {id:3,
    name: 'Felix',
    tasks: tasksArr.filter(task => task.userId === 3)
},
]


const resolvers = {
    Query: {
        users: () => usersArr,
        user: (root, {id}) => usersArr.filter(user => user.id === id)[0],
        task: (root, {id}) => tasksArr.filter(task => task.id === id)[0],
    },
    Mutation: {
        createTask: (root, {id, title, userId, completed, created}) => {
            tasksArr.push({id, title, userId, completed, created});
            return tasksArr[tasksArr.length - 1];
        }
    }

}

export default resolvers;