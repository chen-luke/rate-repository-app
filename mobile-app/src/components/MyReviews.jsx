import { View, FlatList } from 'react-native';
import Text from './Text';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import ItemSeparator from './ItemSeparator';
import { Review } from './SingleViewRepository';

const MyReviews = () => {
  const { loading, error, data, refetch } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true },
  });

  const reviews = data?.me?.reviews?.edges.map((edge) => edge.node) || [];

  return (
    <View>
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <Review review={item} showButtons={true} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default MyReviews;
