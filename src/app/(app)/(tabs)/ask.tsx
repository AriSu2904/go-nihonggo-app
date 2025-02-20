import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { height, width } from "@/utils/sizeContext";
import { backgroundScreen } from "@/utils/globalStyle";

export default function AskScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Blur Background */}
      <BlurView intensity={50} style={StyleSheet.absoluteFill} />

      {/* Content */}
      <View style={styles.content}>
        <Image
          source={require("../../../assets/images/go-nihonggo.webp")}
          style={styles.lockIcon}
        />
        <Text style={styles.text}>Fitur ini belum terbuka untuk Anda</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundScreen,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    padding: width * 0.05,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: width * 0.05,
  },
  lockIcon: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: height * 0.02,
  },
  text: {
    fontSize: height * 0.025,
    fontWeight: "bold",
    color: "black",
  },
});
