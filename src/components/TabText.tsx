import React from "react";
import { Text } from "react-native";

interface TextProps {
    children: React.ReactNode;
    fontFamily?: string;
    fontSize: number;
    focused?: boolean;
    style?: any;
}

const CustomText: React.FC<TextProps> = ({ children, fontFamily, fontSize, focused, style, ...props }) => {
  const textColor = focused ? "black" : "#9C4A4A";

  return (
    <Text
      style={[
        {
          fontFamily: fontFamily || "Poppins-Medium",
          fontSize: fontSize, 
          color: textColor,
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