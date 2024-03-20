import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useContext} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import {AuthContext} from '../navigation/AuthProvider';

export default function LoginScreen({navigation}) {
  const {login, loading, forgotPassword} = useContext(AuthContext);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      login(values.email, values.password);
    },
  });

  const handleForgotPassword = async () => {
    forgotPassword(formik.values.email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Challenge App</Text>
      <FormInput
        labelValue={formik.values.email}
        onChangeText={formik.handleChange('email')}
        placeholderText="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {formik.errors.email && (
        <Text style={styles.errorText}>{formik.errors.email}</Text>
      )}
      <FormInput
        labelValue={formik.values.password}
        onChangeText={formik.handleChange('password')}
        placeholderText="Password"
        secureTextEntry={true}
      />
      {formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
      <TouchableOpacity
        style={styles.forgotButton}
        onPress={handleForgotPassword}>
        <Text style={styles.navButtonText2}>Forgot Password?</Text>
      </TouchableOpacity>
      <FormButton
        buttonTitle="Sign In"
        onPress={formik.handleSubmit}
        disabled={formik.isSubmitting}
      />
      {loading && <ActivityIndicator size="large" color="#FFFFF" />}
      <TouchableOpacity
        style={styles.accountText}
        onPress={() => navigation.navigate('SignupScreen')}>
        <Text style={styles.navButtonText}>
          Don't have an account? Create here
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#E2FC9B',
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  accountText: {
    marginVertical: 20,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  navButtonText2: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
});
