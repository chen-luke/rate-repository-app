import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import { useNavigate } from 'react-router-native';
import SortMenu from './SortMenu';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { searchValue, setSearchValue, sortingMethod, setSortingMethod } =
      this.props;

    return (
      <View>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
        <SortMenu
          sortingMethod={sortingMethod}
          setSortingMethod={setSortingMethod}
        />
      </View>
    );
  };

  render() {
    const { repositories, navigate, onEndReach } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <>
        <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          ListHeaderComponent={this.renderHeader}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}
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
  }
}

const RepositoryList = () => {
  // 1. Lift state here
  const [sortingMethod, setSortingMethod] = useState('latest');
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const [debouncedSearchValue] = useDebounce(searchValue, 500);

  // 2. Define the mapping logic
  const sortOptions = {
    latest: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
    highest: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
    lowest: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
  };

  // 3. Pass variables to the hook
  const { repositories, loading, error, fetchMore } = useRepositories({
    ...sortOptions[sortingMethod],
    searchKeyword: debouncedSearchValue,
    first: 3,
  });

  const onEndReach = () => {
    fetchMore();
  };

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
      setSearchValue={setSearchValue}
      searchValue={searchValue}
      navigate={navigate}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
