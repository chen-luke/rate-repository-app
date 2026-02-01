import { Pressable, TextInput, View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 20,
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
  // This replaces your button style
  submitButton: {
    height: 60, // Now your height will actually work!
    backgroundColor: theme.colors.primary, // Use your theme's primary color
    justifyContent: 'center', // Centers text vertically
    alignItems: 'center', // Centers text horizontally
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const SignIn = () => {
  return (
    <View style={styles.container}>
      <TextInput placeholder='Username' style={styles.textInput} />
      <TextInput
        placeholder='Password'
        secureTextEntry
        style={styles.textInput}
      />

      {/* Custom Button using Pressable */}
      <Pressable
        style={({ pressed }) => [
          styles.submitButton,
          { opacity: pressed ? 0.7 : 1 }, // Visual feedback when tapped
        ]}
        onPress={() => console.log('Sign in pressed')}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
