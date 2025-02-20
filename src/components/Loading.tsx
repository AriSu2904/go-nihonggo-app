import { scaleFont } from "@/utils/sizeContext";
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

interface LoadingProps {
  size?: number;
  color?: string;
}

export default function Loading({ size = 50, color = "#FAC577"}: LoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={scaleFont(size)} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
