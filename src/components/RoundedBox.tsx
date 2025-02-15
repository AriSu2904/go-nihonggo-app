import { FC } from "react";
import { Image, Text, TouchableOpacity } from "react-native";

type RoundedBoxProps = {
    imgUri: string;
    onPress: () => void;
}

const RoundedBox: FC<RoundedBoxProps> = ({ imgUri, onPress }) => (
    <TouchableOpacity className="w-16 h-16 rounded-2xl items-center justify-center m-1 bg-white"
        onPress={onPress}>
        <Image source={{ uri: imgUri }}
            style={{ resizeMode: 'cover', width: 55, height: 55 }}
        />
    </TouchableOpacity>
);

export default RoundedBox;