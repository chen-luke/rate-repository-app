import { View, FlatList, Alert } from 'react-native';
import Text from './Text';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import ItemSeparator from './ItemSeparator';
import Review from './Review';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/queries';

const MyReviews = () => {
  const { loading, error, data, refetch } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true },
  });

  const [mutate, result] = useMutation(DELETE_REVIEW);

  const onHandleDeleteReview = async (review) => {
    try {
      await mutate({
        variables: { deleteReviewId: review.id },
        update: (cache) => {
          // Apollo uses 'Type:ID' as the internal key (e.g., 'Review:123')
          const normalizedId = cache.identify({
            __typename: 'Review',
            id: review.id,
          });

          // Remove that specific object from the cache
          cache.evict({ id: normalizedId });

          // Clean up the cache to remove any "hanging" references
          cache.gc();
        },
      });
    } catch (error) {
      console.log('Error deleting review: ', error);
      Alert.alert('Error', 'Could not delete the review.');
    }
  };

  const reviews = data?.me?.reviews?.edges.map((edge) => edge.node) || [];

  if (!reviews.length) {
    return (
      <View>
        <Text>You currently have zero reviews</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Review
            review={item}
            showButtons={true}
            onDeleteReview={() => onHandleDeleteReview(item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default MyReviews;
