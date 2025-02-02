import React from "react";
import { View, Text, TouchableOpacity, GestureResponderEvent } from "react-native";
import CustomText from "./TabText";
import Icon from "react-native-vector-icons/MaterialIcons";

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
  titleColor?: string,
}

const Card: React.FC<CardProps> = ({
  title,
  titleSize = 16,
  backgroundColor = "bg-white", 
  rounded = "2xl",
  children,
  onPress,
  titleColor = "black",
}) => {
  
  return (
    <View
    className={`${backgroundColor} rounded-${rounded} elevation-2xl py-3 my-2 justify-center items-center`}>
      <CustomText fontColor={titleColor} fontSize={titleSize} fontFamily="Poppins-SemiBold" >
        {title}
        <TouchableOpacity onPress={onPress}>
        <Icon name="help-outline" size={14} color="#333333" />
        </TouchableOpacity>
      </CustomText>
      {children}
    </View>
  );
};

export default Card;
