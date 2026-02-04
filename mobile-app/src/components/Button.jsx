import { Pressable, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
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

const Button = ({ text, onHandlePress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.submitButton,
        { opacity: pressed ? 0.7 : 1 }, // Visual feedback when tapped
      ]}
      onPress={onHandlePress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

export default Button;
