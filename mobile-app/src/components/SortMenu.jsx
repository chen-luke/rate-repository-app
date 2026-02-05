import { FlatList, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Text from './Text';
import { useState, useRef } from 'react';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: theme.colors.grayBg,
    justifyContent: 'center',
  },
});

const SortMenu = ({ sortingMethod, setSortingMethod }) => {
  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  return (
    <View style={styles.container}>
      <Picker
        ref={pickerRef}
        selectedValue={sortingMethod}
        onValueChange={(itemValue, itemIndex) => setSortingMethod(itemValue)}
      >
        <Picker.Item
          label='Sort Repository By:'
          value={''}
          enabled={false}
          color='#999'
        />
        <Picker.Item
          color={theme.colors.textPrimary}
          label='Latest repositories'
          value={'latest'}
        />
        <Picker.Item
          color={theme.colors.textPrimary}
          label='Highest rated repositories'
          value={'highest'}
        />
        <Picker.Item
          color={theme.colors.textPrimary}
          label='Lowest rated repositories'
          value={'lowest'}
        />
      </Picker>
    </View>
  );
};

export default SortMenu;
