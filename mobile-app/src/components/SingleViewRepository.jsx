import RepositoryItem from './RepositoryItem';
import { View } from 'react-native';
import { useParams } from 'react-router-native';
import Text from './Text';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const SingleViewRepository = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      <RepositoryItem item={data.repository} showButton={true} />
    </View>
  );
};

export default SingleViewRepository;
