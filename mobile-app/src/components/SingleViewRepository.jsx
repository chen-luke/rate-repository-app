import RepositoryItem from './RepositoryItem';
import { View, StyleSheet, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import Text from './Text';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import theme from '../theme';
import Button from './Button';

const styles = StyleSheet.create({
  reviewContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    gap: 20,
    backgroundColor: theme.colors.white,
  },
  rating: {
    width: 55,
    height: 55,
    padding: 10,
    borderWidth: 2.5,
    borderColor: theme.colors.primary,
    borderRadius: 50,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewInfo: {
    flexDirection: 'column',
    flex: 1,
  },
  separator: {
    height: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    padding: 15,
    gap: 15,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const Review = ({ review, showButtons = false }) => {
  const date = new Date(review.createdAt).toLocaleDateString();
  return (
    <View>
      <View style={styles.reviewContainer}>
        <View style={styles.rating}>
          <Text color={'primary'} fontWeight={'bold'} fontSize={'subheading'}>
            {review.rating}
          </Text>
        </View>
        <View style={styles.reviewInfo}>
          {review.user?.username && (
            <Text fontSize={'subheading'} fontWeight={'bold'}>
              {review.user.username}
            </Text>
          )}
          {review.repository?.fullName && (
            <Text fontWeight={'bold'}>{review.repository.fullName}</Text>
          )}
          <Text>{date}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      {showButtons && (
        <View style={styles.buttonContainer}>
          <Button
            text={'View repository'}
            flex={1}
            onHandlePress={() => console.log('View Repository was pressed!')}
          ></Button>
          <Button
            text={'Delete review'}
            warn={true}
            flex={1}
            onHandlePress={() => console.log('Delete review was pressed!')}
          ></Button>
        </View>
      )}
    </View>
  );
};

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
