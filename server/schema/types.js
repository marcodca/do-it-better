const { gql } = require('apollo-server-express') ;

const typeDefs = gql`
    type Query {
        users: [User]
        user(id: ID!): User!
        task(id: ID!): Task!
    }
    type User {
        id: ID!
        name: String!
        tasks: [Task]
    }
    type Task {
        id: ID!
        title: String!
        userId: Int!
        completed: Boolean!
        created: String!
    }
    type Mutation {
        createTask(id: ID, title: String!, userId: Int!, completed: Boolean, created: String): Task
        deleteTask(id: ID!): Task
        toggleTaskCompleted(id: ID!): Task
    }
    type Subscription {
        taskCompletedToggled(id: ID!): Task
        userTasksAddedOrDeleted(id: ID!): [Task]
    }
`
module.exports = typeDefs
