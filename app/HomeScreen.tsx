// app/HomeScreen.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';
import { supabase } from '../lib/supabase';

export default function HomeScreen({ navigation }: any) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.replace('Auth');
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Welcome to Explore!</Title>
      <Text>You're logged in 🎉</Text>
      <Button mode="contained" onPress={handleLogout} style={styles.button}>
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { marginBottom: 16, fontSize: 24 },
  button: { marginTop: 20 },
});
