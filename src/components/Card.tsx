import React from "react";
import { View, Text, TouchableOpacity, GestureResponderEvent } from "react-native";
import CustomText from "./TabText";

interface CardProps {
  title: string;           // Judul card
  titleSize?: number;      // Ukuran font judul card
  backgroundColor?: string;  // Warna latar belakang card
  onPress?: (event: GestureResponderEvent) => void; // Fungsi saat card di-klik
  padding?: number;        // Padding card
  borderRadius?: number;   // Radius sudut card
  rounded?: string;       // rounding size
  disabled?: boolean;      // Apakah card dinonaktifkan
  children: React.ReactNode; // Konten card
  justifyContent?: string;
  alignItems?: string;
  focused?: boolean;
}

const Card: React.FC<CardProps> = ({
  title = "You dont have any progress, let's learn!",
  titleSize = 14,
  backgroundColor = "bg-white", 
  onPress,
  rounded = "2xl",
  disabled = false,
  children,
  focused = false,
}) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} 
    className={`${backgroundColor} rounded-${rounded} elevation-2xl py-3 my-2 justify-center items-center`}>
      <CustomText focused={focused} fontSize={titleSize} fontFamily="Poppins-SemiBold">
        {title}
      </CustomText>
      {children}
    </TouchableOpacity>
  );
};

export default Card;
