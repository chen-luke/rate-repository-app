import { AUTHENTICATE_USER } from '../graphql/queries';
import { useMutation } from '@apollo/client';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE_USER);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } });
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
