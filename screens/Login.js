import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { loginAuth, registerAuth } from '../components/Auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = loginAuth(email, password);
  const handleRegister = registerAuth(email, password);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sleep Tracker</Text>
      <TextInput
        style={styles.text}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.text}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Log in" onPress={handleLogin} />
      <View style={styles.button} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20
  },
  text: {
    height: 40,
    borderWidth: 0.5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  button: {
    marginTop: 10,
  },
});
