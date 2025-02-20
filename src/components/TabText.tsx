import { height, scaleFont } from "@/utils/sizeContext";
import React from "react";
import { Text } from "react-native";

interface TextProps {
    children: React.ReactNode;
    fontFamily?: string;
    fontSize: number;
    fontColor?: string;
    style?: any;
}

const CustomText: React.FC<TextProps> = ({ children, fontFamily, fontSize, fontColor, style, ...props }) => {

  return (
    <Text
      style={[
        {
          fontFamily: fontFamily || "Poppins-Medium",
          fontSize: scaleFont(fontSize), 
          color: fontColor || "#ffffff",
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default CustomText;