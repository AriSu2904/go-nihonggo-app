import { View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import { Link } from "expo-router";

import goNihonggoImg from "@/assets/images/go-nihonggo.webp";
import { RANDOM_LIGHT_COLOR } from "@/utils/globalStyle";

export default function WelcomeScreen() {
  return (
    <View className="flex-1 p-4 justify-center bg-background">
      <View className="flex items-center">
        <Text className="text-2xl font-bold text-white">Welcome to</Text>
        <Text className="text-3xl font-bold text-white">Go-Nihonggo! APP</Text>
      </View>

      <View className="mt-10 flex items-center">
        <Image source={goNihonggoImg} className="size-[120px] rounded-lg" />
      </View>

      <View className="mt-12 gap-2">
        <Link
          href="/sign-in"
          className="p-3 rounded-lg text-center"
          style={{ backgroundColor: RANDOM_LIGHT_COLOR() }}
        >
          <Text className="text-lg font-bold text-black">Sign In</Text>
        </Link>

        <Link
          href="/sign-up"
          className="p-3 rounded-lg text-center"
          style={{ backgroundColor: RANDOM_LIGHT_COLOR() }}
        >
          <Text className="text-lg font-bold text-black">Sign Up</Text>
        </Link>
      </View>
    </View>
  );
}
