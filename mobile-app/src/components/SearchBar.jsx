import { Pressable, TextInput, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
import Button from './Button';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
  },
  searchBar: {
    padding: 10,
    backgroundColor: theme.colors.white,
    borderRadius: 5,
    flex: 1,
  },
});

const SearchBar = ({ searchValue, setSearchValue }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder='Filter repository'
        value={searchValue}
        onChangeText={(text) => setSearchValue(text)}
      ></TextInput>
      <Button
        text={'X'}
        widthVal={50}
        onHandlePress={() => setSearchValue('')}
      />
    </View>
  );
};

export default SearchBar;
