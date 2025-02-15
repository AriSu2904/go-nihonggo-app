import { View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import { Link } from "expo-router";

import goNihonggoImg from "@/assets/images/go-nihonggo.webp";

export default function WelcomeScreen() {
  return (
    <View className="flex-1 p-4 justify-center bg-[#FCF7F7]">
      <View className="flex items-center">
        <Text className="text-lg font-semibold">Welcome to</Text>
        <Text className="text-2xl font-bold">Go-Nihonggo! APP</Text>
      </View>

      <View className="mt-10 flex items-center">
        <Image source={goNihonggoImg} className="size-[120px] rounded-lg" />
      </View>

      <View className="mt-12 gap-2">
        <Link href="/sign-in" asChild>
          <Button mode="contained">Login</Button>
        </Link>

        <Link href="/sign-up" asChild>
          <Button mode="contained" buttonColor="#F2E8E8" textColor="#000">
            Register
          </Button>
        </Link>
      </View>
    </View>
  );
}
