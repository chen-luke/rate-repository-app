import { Image, StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';
import StatsItem from './StatsItem';
import Button from './Button';

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    padding: 20,
    backgroundColor: 'white',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-around',
  },
  languageIcon: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  infoWrapper: {
    flexDirection: 'column',
    flex: 1,
    gap: 5,
  },
});

const RepositoryItem = ({ item, showButton = false }) => {
  return (
    <View style={styles.card} testID='repositoryItem'>
      <View style={styles.headerContainer}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />

        <View style={styles.infoWrapper}>
          <Text fontWeight={'bold'}>{item.fullName}</Text>
          <Text>{item.description}</Text>

          <View style={styles.languageIcon}>
            <Text color={'white'}>{item.language}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <StatsItem text={'Stars'} stat={item.stargazersCount} />
        <StatsItem text={'Forks'} stat={item.forksCount} />
        <StatsItem text={'Reviews'} stat={item.reviewCount} />
        <StatsItem text={'Rating'} stat={item.ratingAverage} />
      </View>
      {showButton && (
        <Button
          text={'Open in GitHub'}
          onHandlePress={() => console.log('Pressed!')}
        />
      )}
      {/* <Pressable
        style={({ pressed }) => [
          styles.submitButton,
          { opacity: pressed ? 0.7 : 1 }, // Visual feedback when tapped
        ]}
        onPress={formik.handleSubmit}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable> */}
    </View>
  );
};

export default RepositoryItem;
