import { StyleSheet } from "react-native";
import { height, width } from "./sizeContext";

const styles = StyleSheet.create({
    screen: {
        marginTop: width * 0.23,
    },
    bottom: {
        paddingBottom: height * 0.12,
    }
});

export default styles;