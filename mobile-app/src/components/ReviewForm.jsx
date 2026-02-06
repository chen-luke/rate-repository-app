import { Pressable, TextInput, View, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';
import Button from './Button';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/queries';
import { useNavigate } from 'react-router-native';

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
  reviewInput: {
    textAlignVertical: 'top',
    height: 200,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    padding: 10,
  },
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  review: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .trim()
    .min(1, 'Repository owner name must be greater or equal to 1 character')
    .required('Repository owner name is required'),
  repositoryName: yup.string().trim().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Min rating is 0')
    .max(100, 'Max rating is 100')
    .required('Rating is required'),
  review: yup.string().ensure().notRequired(), // ensure() Transforms null/undefined into ''
});

const ReviewForm = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onCreateReview = async (values) => {
    const review = {
      ownerName: values.ownerName,
      repositoryName: values.repositoryName,
      rating: Number(values.rating),
      text: values.review,
    };

    try {
      const { data } = await mutate({ variables: { review } });

      if (data?.createReview) {
        navigate(`/repositories/${data.createReview.repositoryId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onCreateReview,
  });

  return (
    <View style={styles.container}>
      {result.error && <Text color={'warn'}>{result.error.message}</Text>}
      <TextInput
        style={styles.textInput}
        onChangeText={formik.handleChange('ownerName')}
        value={formik.values.ownerName}
        placeholder='owner name'
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text color={'warn'}>{formik.errors.ownerName}</Text>
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
        style={styles.reviewInput}
        onChangeText={formik.handleChange('review')}
        value={formik.values.review}
        placeholder='Write your review here...'
        multiline={true}
        rows={4}
      />
      {formik.touched.review && formik.errors.review && (
        <Text color={'warn'}>{formik.errors.review}</Text>
      )}
      <Button text={'Create a review'} onHandlePress={formik.handleSubmit} />
    </View>
  );
};

export default ReviewForm;
