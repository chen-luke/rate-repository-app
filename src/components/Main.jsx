import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import Text from './Text';
import RepositoryList from './RepositoryList';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <Text>Rate Repository Application</Text>
      <Text>Simple text</Text>
      <Text style={{ paddingBottom: 10 }}>Text with custom style</Text>
      <Text fontWeight='bold' fontSize='subheading' color='primary'>
        Bold subheading
      </Text>
      <Text color='textSecondary'>Text with secondary color</Text>
      <RepositoryList />
    </View>
  );
};

export default Main;
