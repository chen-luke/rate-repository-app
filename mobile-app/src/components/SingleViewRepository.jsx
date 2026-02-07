import RepositoryItem from './RepositoryItem';
import { View, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import Text from './Text';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import ItemSeparator from './ItemSeparator';
import Review from './Review';

const SingleViewRepository = () => {
  const { id } = useParams();

  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id, first: 3 },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository?.reviews?.pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    // console.log(
    //   'Fetching more items after cursor:',
    //   data?.repository?.reviews?.pageInfo?.endCursor,
    // );

    fetchMore({
      variables: {
        id, // Keep the repository ID
        first: 3, // Keep the page size consistent
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  const onEndReach = () => {
    handleFetchMore();
  };

  if (loading && !data) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = data.repository.reviews.edges;
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <Review review={item.node} />}
        keyExtractor={({ node }) => node.id}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={() => (
          <View>
            <RepositoryItem item={data.repository} showButton={true} />
            <ItemSeparator />
          </View>
        )}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default SingleViewRepository;
