import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import { useNavigate } from 'react-router-native';
import SortMenu from './SortMenu';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  sortingMethod,
  setSortingMethod,
}) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  return (
    <>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={
          <SortMenu
            key='stable-sort-menu'
            sortingMethod={sortingMethod}
            setSortingMethod={setSortingMethod}
          />
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigate(`/repositories/${item.id}`);
            }}
          >
            <RepositoryItem item={item}></RepositoryItem>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

const RepositoryList = () => {
  // 1. Lift state here
  const [sortingMethod, setSortingMethod] = useState('latest');

  // 2. Define the mapping logic
  const sortOptions = {
    latest: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
    highest: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
    lowest: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
  };

  // 3. Pass variables to the hook
  const { repositories, loading, error } = useRepositories(
    sortOptions[sortingMethod],
  );

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  if (error) {
    console.log('Apollo Error:', error);
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      sortingMethod={sortingMethod}
      setSortingMethod={setSortingMethod}
    />
  );
};

export default RepositoryList;
