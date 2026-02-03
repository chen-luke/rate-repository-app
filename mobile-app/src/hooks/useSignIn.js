import { AUTHENTICATE_USER } from '../graphql/queries';
import { useApolloClient, useMutation } from '@apollo/client';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE_USER);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } });
    const token = data.authenticate.accessToken;
    await authStorage.setAccessToken(token);
    await apolloClient.resetStore();
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
