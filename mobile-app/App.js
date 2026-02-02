import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client/react';
import createApolloClient from './src/utils/apolloClient';
import Main from './src/components/Main';
import Constants from 'expo-constants';
import AuthStorage from './src/utils/authStorage';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  console.log(Constants.expoConfig);
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style='auto' />
    </>
  );
};

export default App;
