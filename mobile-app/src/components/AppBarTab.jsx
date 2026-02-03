import { Pressable } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const AppBarTab = ({ name, link, onPress }) => {
  const content = (
    <Text
      style={{ padding: 20 }}
      color={'white'}
      fontSize={'subheading'}
      fontWeight={'bold'}
    >
      {name}
    </Text>
  );

  if (link) {
    return <Link to={link}>{content}</Link>;
  }

  return <Pressable onPress={onPress}>{content}</Pressable>;
};

export default AppBarTab;
