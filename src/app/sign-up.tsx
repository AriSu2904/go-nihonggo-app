import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text, Title } from "react-native-paper";
import { Link } from "expo-router";
import { useForm, Controller } from "react-hook-form";

export default function RegisterScreen() {
  const { control } = useForm();

  const handleRegister = () => {
    console.log("test");
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Register</Title>

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
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Register
      </Button>

      <Link href="/sign-in" asChild>
        <Button mode="text" style={styles.button}>
          Sudah punya akun? Login
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
