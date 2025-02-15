import { height, width } from "@/utils/sizeContext";
import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface BackButtonProps {
    onPress: () => void;
    backgroundColor: string;
    iconColor?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress, backgroundColor, iconColor}) => (
    <TouchableOpacity
        onPress={onPress}
        className="absolute rounded-full z-50"
        style={{ backgroundColor, width: width * 0.15, height: height * 0.05, justifyContent: 'center', alignItems: 'center', left: "4%", top: "7%" }}
    >
        <Icon name="arrow-back" size={24} color={iconColor} />
    </TouchableOpacity>
);

export default BackButton;