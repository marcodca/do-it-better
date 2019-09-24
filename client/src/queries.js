import gql from "graphql-tag";

export const GET_USERS = gql`
  {
    users {
      id
      name
    }
  }
`;

export const GET_USER_TASKS = gql`
  query User($id: ID!) {
    user(id: $id) {
      name
      tasks {
        id
        title
        completed
        created
      }
    }
  }
`;

export const SUBSCRIBE_TO_USER_TASKS = gql`
  subscription($id: ID!) {
    userTasksAddedOrDeleted(id: $id) {
      id
      title
      completed
      created
    }
  }
`;

export const DELETE_TASK = gql`
  mutation($id: ID!){
    deleteTask(id: $id) {
    id
    title
  }
}
`

export const CREATE_TASK = gql`
  mutation($title: String!, $userId: ID!){
  createTask(title: $title, userId: $userId){
    id
    title
    created
  }
}
`
