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

  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = data.repository.reviews.edges;
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <Review review={item.node} />}
        keyExtractor={({ node }) => node.id}
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
