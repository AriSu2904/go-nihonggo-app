import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text, Title } from "react-native-paper";
import { Link } from "expo-router";
import { useForm, Controller } from "react-hook-form";

import { useSession } from "@/contexts/auth.context";

export default function LoginScreen() {
  const { control } = useForm();
  const { signIn } = useSession();

  const handleLogin = () => {
    signIn();
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Login</Title>

      <Controller
        control={control}
        name="nim"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Nim"
            value={value}
            onChangeText={onChange}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Password"
            value={value}
            onChangeText={onChange}
            style={styles.input}
            secureTextEntry
          />
        )}
      />

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <Link href="/sign-up" asChild>
        <Button mode="text" style={styles.button}>
          Belum punya akun? Daftar
        </Button>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});
