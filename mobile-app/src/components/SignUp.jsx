import { Pressable, TextInput, View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import Button from './Button';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 10,
    backgroundColor: 'white',
    padding: 20,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    padding: 10,
  },
});

const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be greater or equal to 5 character')
    .max(30, 'Username must be less than 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password length must be greater or equal than 5 characters')
    .max(50, 'Password length must be less than 50 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirming Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const SignUpContainer = ({ onSubmit, result }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <View style={styles.container}>
      {result.error && <Text color={'warn'}>{result.error.message}</Text>}
      <TextInput
        placeholder='Username'
        style={styles.textInput}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: theme.colors.warn }}>
          {formik.errors.username}
        </Text>
      )}
      <TextInput
        placeholder='Password'
        secureTextEntry
        style={styles.textInput}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: theme.colors.warn }}>
          {formik.errors.password}
        </Text>
      )}

      <TextInput
        placeholder='Confirm Password'
        secureTextEntry
        style={styles.textInput}
        value={formik.values.confirmPassword}
        onChangeText={formik.handleChange('confirmPassword')}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <Text style={{ color: theme.colors.warn }}>
          {formik.errors.confirmPassword}
        </Text>
      )}
      <Button text={'Sign Up'} onHandlePress={formik.handleSubmit} />
    </View>
  );
};

const SignUp = () => {
  const [signUp, result] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const handleSignUp = async (values) => {
    const user = {
      user: { username: values.username, password: values.password },
    };
    try {
      const data = await signUp(user);
      if (data?.createUser) {
        await signIn({
          username: values.username,
          password: values.password,
        });

        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <SignUpContainer onSubmit={handleSignUp} result={result} />;
};

export default SignUp;
