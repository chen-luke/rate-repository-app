import { Pressable, TextInput, View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

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
  submitButton: {
    height: 50,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username must be greater or equal to 1 character')
    .required('Username is required'),
  password: yup
    .string()
    .min(4, 'Password length must be greater or equal than 4 characters')
    .required('Password is required'),
});

export const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <View style={styles.container}>
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

      {/* Custom Button using Pressable */}
      <Pressable
        style={({ pressed }) => [
          styles.submitButton,
          { opacity: pressed ? 0.7 : 1 }, // Visual feedback when tapped
        ]}
        onPress={formik.handleSubmit}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn, result] = useSignIn();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    console.log('Logged in with:', values.username, values.password);
    const { username, password } = values;
    // This is  where you'd call your API
    try {
      const data = await signIn({ username, password });
      if (data) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <SignInContainer onSubmit={handleLogin} />;
};

export default SignIn;
