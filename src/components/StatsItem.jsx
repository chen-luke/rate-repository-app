import { View } from 'react-native';
import Text from './Text';

const formatNumber = (stat) => Math.floor((stat / 1000) * 10) / 10;

const StatsItem = ({ text, stat }) => {
  return (
    <View>
      <Text fontWeight={'bold'}>
        {stat >= 1000 ? `${formatNumber(stat)}k` : stat}
      </Text>
      <Text>{text}</Text>
    </View>
  );
};

export default StatsItem;
