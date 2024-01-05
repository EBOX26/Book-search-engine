import { gql } from '@apollo/client';

// Mutation to log in a user
export const LOGIN_USER = gql`
  mutation loginUser($input: LoginInput!) {
    loginUser(input: $input) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Mutation to add a new user
export const ADD_USER = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        username
      }
    }
  }
`;
