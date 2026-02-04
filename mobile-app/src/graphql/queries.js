import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          fullName
          id
          language
          stargazersCount
          ratingAverage
          reviewCount
          forksCount
          description
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const AUTHENTICATE_USER = gql`
  mutation AuthenticateUser($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
      user {
        id
        username
      }
    }
  }
`;

export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORY = gql`
  query GetRepo($id: ID!) {
    repository(id: $id) {
      id
      fullName
      url
      language
      stargazersCount
      ratingAverage
      reviewCount
      forksCount
      description
      ownerAvatarUrl
    }
  }
`;
