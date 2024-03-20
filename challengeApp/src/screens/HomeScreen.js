import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';

export default function HomeScreen() {
  const {logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.buttonStyle}>
        <Text style={styles.heading}>Welcome!</Text>
        <FormButton buttonTitle="Logout" onPress={() => logout()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E2FC9B',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonStyle: {
    marginHorizontal: 15,
  },
});
