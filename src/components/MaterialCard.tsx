import React from "react";
import { View, TouchableOpacity, GestureResponderEvent } from "react-native";
import CustomText from "./TabText";
import { fontColors } from "@/utils/globalStyle";

interface MaterialCardProps {
  title: string;           // Judul card
  titleSize?: number;      // Ukuran font judul card
  onPress?: (event: GestureResponderEvent) => void; // Fungsi saat card di-klik
  disabled?: boolean;      // Apakah card dinonaktifkan
  children: React.ReactNode; // Konten card
  focused?: boolean;
  imageResource?: any;
  romaji: string;
  backgroundColor: string;
}

const MaterialCard: React.FC<MaterialCardProps> = ({
  title,
  onPress,
  romaji,
  backgroundColor,
}) => {
  return (
    <TouchableOpacity onPress={onPress} className={`${backgroundColor} rounded-2xl elevation-lg p-2`}>
        <View className="justify-center px-5">
          <CustomText fontColor={fontColors.black} fontSize={24} fontFamily="Poppins-SemiBold"
          style={{letterSpacing: 8}}
          >
            {title}
          </CustomText>
            <CustomText fontColor={fontColors.black} fontSize={14} fontFamily="Poppins-Medium"
              style={{textAlign: 'right', letterSpacing: 3}}>
              {romaji}
            </CustomText>
        </View>
    </TouchableOpacity>
  );
};

export default MaterialCard;
