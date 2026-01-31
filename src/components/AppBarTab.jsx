import { Pressable } from 'react-native';
import Text from './Text';

const AppBarTab = ({ name }) => {
  return (
    <Pressable onPress={() => console.log('pressed!')}>
      <Text
        style={{ padding: 20 }}
        color={'white'}
        fontSize={'subheading'}
        fontWeight={'bold'}
      >
        {name}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
