import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBg,
    display: 'flex',
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate('/signin');

  const { loading, error, data, refetch } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
  });

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/signin');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab name={'Repository'} link={'/repository'} />
        {data?.me ? (
          <AppBarTab name={'Sign Out'} onPress={onSignOut} />
        ) : (
          <AppBarTab name={'Sign In'} link={'/signin'} />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
