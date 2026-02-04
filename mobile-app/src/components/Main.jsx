// import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import { Route, Routes, Navigate } from 'react-router-native';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import SingleViewRepository from './SingleViewRepository';

const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.grayBg,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='/repositories/:id' element={<SingleViewRepository />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  );
};

export default Main;
