import { Pressable, TextInput, View, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';
import Button from './Button';
import * as yup from 'yup';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 10,
    backgroundColor: 'white',
    padding: 20,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    padding: 10,
  },
});

const initialValues = {
  username: '',
  repositoryName: '',
  rating: '',
  review: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(1, 'Username must be greater or equal to 1 character')
    .required('Username is required'),
  repositoryName: yup.string().trim().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Min rating is 0')
    .max(100, 'Max rating is 100')
    .required('Rating is required'),
  review: yup.string().nullable().notRequired(),
});

const ReviewForm = () => {
  const onCreateReview = () => {
    console.log('We created a new review');
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onCreateReview,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={formik.handleChange('username')}
        value={formik.values.username}
        placeholder='username'
      />
      {formik.touched.username && formik.errors.username && (
        <Text color={'warn'}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={styles.textInput}
        onChangeText={formik.handleChange('repositoryName')}
        value={formik.values.repositoryName}
        placeholder='repository name'
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text color={'warn'}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        style={styles.textInput}
        onChangeText={formik.handleChange('rating')}
        value={formik.values.rating}
        placeholder='rating'
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text color={'warn'}>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={styles.textInput}
        onChangeText={formik.handleChange('review')}
        value={formik.values.review}
        placeholder='review'
      />
      {formik.touched.review && formik.errors.review && (
        <Text color={'warn'}>{formik.errors.review}</Text>
      )}
      <Button text={'Create a review'} onHandlePress={formik.handleSubmit} />
    </View>
  );
};

export default ReviewForm;
