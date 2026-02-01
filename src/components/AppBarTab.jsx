import { Pressable } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const AppBarTab = ({ name, link }) => {
  return (
    <Pressable onPress={() => console.log('pressed!')}>
      <Link to={link}>
        <Text
          style={{ padding: 20 }}
          color={'white'}
          fontSize={'subheading'}
          fontWeight={'bold'}
        >
          {name}
        </Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
