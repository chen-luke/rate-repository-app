import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client/react';

const useRepositories = (variables) => {
  const { loading, error, data, fetchMore, refetch } = useQuery(
    GET_REPOSITORIES,
    {
      variables,
      fetchPolicy: 'cache-and-network',
    },
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories?.pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    console.log(
      'Fetching more items after cursor:',
      data.repositories.pageInfo.endCursor,
    );

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data ? data.repositories : undefined,
    fetchMore: handleFetchMore,
    loading,
    error,
    refetch,
  };
};

export default useRepositories;
