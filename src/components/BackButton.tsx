import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface BackButtonProps {
    onPress: () => void;
    backgroundColor: string
}

const BackButton: React.FC<BackButtonProps> = ({ onPress, backgroundColor }) => (
    <TouchableOpacity
        onPress={onPress}
        className="absolute top-7 left-6 p-3 rounded-full z-50"
        style={{ backgroundColor }}
    >
        <Icon name="arrow-back" size={24} color="white" />
    </TouchableOpacity>
);

export default BackButton;