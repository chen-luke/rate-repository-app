import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client/react';

const useRepositories = (variables) => {
  const { loading, error, data, refetch } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return {
    repositories: data ? data.repositories : undefined,
    loading,
    error,
    refetch,
  };
};

export default useRepositories;
