import React from "react";
import { View, Text, TouchableOpacity, GestureResponderEvent } from "react-native";
import CustomText from "./TabText";

interface CardProps {
  title: string;           // Judul card
  content: string;         // Konten card
  titleSize?: "sm" | "md" | "lg" | "xl"; // Ukuran font judul
  contentSize?: "sm" | "md" | "lg" | "xl"; // Ukuran font konten
  backgroundColor?: string;  // Warna latar belakang card
  onPress?: (event: GestureResponderEvent) => void; // Fungsi saat card di-klik
  padding?: number;        // Padding card
  borderRadius?: number;   // Radius sudut card
  rounded?: string;       // rounding size
  disabled?: boolean;      // Apakah card dinonaktifkan
  children: React.ReactNode; // Konten card
}

const Card: React.FC<CardProps> = ({
  title,
  content,
  titleSize = "xl",         // Default
  contentSize = "sm",       // Default
  backgroundColor = "white", 
  onPress,
  padding = 6,
  borderRadius = 8,
  rounded = "2xl",
  disabled = false,
  children,
}) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} className={`bg-${backgroundColor} p-${padding} rounded-${borderRadius} shadow-md w-full rounded-${rounded} elevation-xl`}>
      <CustomText fontSize={14} fontFamily="Poppins-SemiBold">
        {title}
      </CustomText>
      {children}
    </TouchableOpacity>
  );
};

export default Card;
