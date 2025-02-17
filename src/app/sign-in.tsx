import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Link, router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { authSchema } from "@/schemas/authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLogin } from "@/queries/authQuery";
import { useSnackbar } from "@/contexts/snackbar.context";
import { useSession } from "@/contexts/auth.context";
import { RANDOM_LIGHT_COLOR } from "@/utils/globalStyle";

export default function LoginScreen() {
  const { signIn } = useSession();
  const snackbar = useSnackbar();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(authSchema),
  });

  const { mutate, isPending } = useLogin({
    onSuccess: ({ data }) => {
      signIn(data.data);
      snackbar.showSnackbar("Login berhasil!");

      router.replace("/");
    },
    onError: (error) => {
      snackbar.showSnackbar("Gagal login, pastikan nim dan password sudah benar!");
    },
  });

  const handleRegister = handleSubmit((data) => {
    return mutate(data);
  });

  return (
    <View className="flex-1 p-4 justify-center bg-background">
      <Text className="text-3xl font-bold text-center text-white">
        Welcome Back! Glad to see you again!
      </Text>

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

      <View className="mt-12 gap-2">
        <TouchableOpacity
          disabled={isPending}
          onPress={handleRegister}
          className="p-3 rounded-lg text-center"
          style={{ backgroundColor: RANDOM_LIGHT_COLOR() }}
        >
          <Text className="text-lg text-center font-bold text-black">
            {isPending ? "Loading..." : "Login"}
          </Text>
        </TouchableOpacity>

        <Link href="/sign-up" className="p-3 rounded-lg text-center">
          <Text className="text-white">Don't have an account? Sign Up here</Text>
        </Link>
      </View>
    </View>
  );
}
