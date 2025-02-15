import React from "react";
import { View, Text, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Link, router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { authSchema } from "@/schemas/authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegister } from "@/queries/authQuery";
import { useSnackbar } from "@/contexts/snackbar.context";

import goNihonggoImg from "@/assets/images/go-nihonggo.webp";

export default function RegisterScreen() {
  const snackbar = useSnackbar();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(authSchema),
  });

  const { mutate, isPending } = useRegister({
    onSuccess: () => {
      snackbar.showSnackbar("Akun berhasil dibuat!, silahkan login");
      router.replace("/sign-in");
    },
    onError: (error) => {
      if (error?.response?.data?.errors) {
        snackbar.showSnackbar(error?.response?.data?.errors);
      } else {
        snackbar.showSnackbar("Gagal membuat akun, pastikan nim yang dimasukkan sudah benar!");
      }
    },
  });

  const handleRegister = handleSubmit((data) => {
    return mutate(data);
  });

  return (
    <View className="flex-1 p-4 justify-center bg-[#FCF7F7]">
      <Text className="text-2xl font-bold text-center">Hello! Register to get Started</Text>

      <View className="mt-12 flex gap-4">
        <Controller
          control={control}
          name="studentId"
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <View className="flex gap-2">
              <TextInput
                label="NIM"
                placeholder="Enter your NIM"
                value={value}
                onChangeText={onChange}
                error={!!errors?.studentId?.message}
                keyboardType="number-pad"
                style={{
                  backgroundColor: "#F2E8E8",
                }}
              />

              {errors?.studentId?.message && (
                <Text className="text-xs text-red-500">{errors?.studentId?.message}</Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <View className="flex gap-2">
              <TextInput
                label="Password"
                placeholder="Enter your password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                error={!!errors?.password?.message}
                style={{
                  backgroundColor: "#F2E8E8",
                }}
              />

              {errors?.password?.message && (
                <Text className="text-xs text-red-500">{errors?.password?.message}</Text>
              )}
            </View>
          )}
        />
      </View>

      <View className="mt-12 gap-4">
        <Button loading={isPending} mode="contained" onPress={handleRegister}>
          Register
        </Button>
      </View>
    </View>
  );
}
