import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import theme from '../theme';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useEffect, useState } from 'react';
import Text from './Text';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
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
  );
};

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();

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

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
