import { height } from "@/utils/sizeContext";
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
          fontSize: height * (fontSize / 700), 
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