// app/index.tsx

import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';

import { supabase } from '../../lib/supabase.js';




import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Provider as PaperProvider,
  Snackbar,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';

const screen = Dimensions.get('window');

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(isLogin ? 'Logged in!' : 'Sign up successful! Check your email.');
    }
    setVisible(true);
    setLoading(false);
  };

  return (
    <PaperProvider>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.background}
        >
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2022.svg',
                }}
                style={styles.logo}
                resizeMode="contain"
              />

              <Title style={styles.title}>
                {isLogin ? 'Login' : 'Sign Up'}
              </Title>

              <TextInput
                label="Email"
                mode="outlined"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
                outlineColor="#764ba2"
                activeOutlineColor="#5b2d91"
              />
              <TextInput
                label="Password"
                mode="outlined"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                outlineColor="#764ba2"
                activeOutlineColor="#5b2d91"
              />

              <Button
                mode="contained"
                onPress={handleAuth}
                loading={loading}
                style={styles.button}
                buttonColor="#5b2d91"
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </Button>

              <Text
                style={styles.toggleText}
                onPress={() => setIsLogin(!isLogin)}
              >
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : 'Already have an account? Login'}
              </Text>
            </View>
          </View>

          <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            duration={3000}
            style={styles.snackbar}
          >
            {message}
          </Snackbar>
        </LinearGradient>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffffee',
    borderRadius: 16,
    padding: 20,
    width: screen.width * 0.7,
    elevation: 10,
    shadowColor: '#000',
  },
  logo: {
    width: 70,
    height: 35,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
    color: '#5b2d91',
  },
  input: {
    marginBottom: 14,
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
    paddingVertical: 6,
  },
  toggleText: {
    marginTop: 14,
    textAlign: 'center',
    color: '#5b2d91',
    fontWeight: '600',
  },
  snackbar: {
    backgroundColor: '#5b2d91',
  },
});
