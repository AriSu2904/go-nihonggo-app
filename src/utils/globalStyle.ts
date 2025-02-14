import { StyleSheet } from "react-native";
import { height, width } from "./sizeContext";

export const fontColors = {
    white: '#ffffff',
    black: '#000000',
}

export const COLORS = {
    greenLime: '#AFD393',
    bluePastel: '#88B8CF',
    blueKing: '#AAC0E5',
    gold: '#FAC577',
    grey: '#EEEEEE',
    oldGrey: '#626262',
    lightGrey: '#dad3db',
    darkGreen: '#819f9f',
    darkBlue: '#2e86ab',
    lightGreen: '#88d498',
    lightYellow: '#f6f5ae',
    orange: '#f06449',
    purple: '#9763e9'
}

export const RANDOM_LIGHT_COLOR = (): string => {
    const colors = ['#AFD393', '#AAC0E5', '#FAC577', '#88B8CF', '#50c9ce', '#88d498', '#f6f5ae'];

    const index = Math.floor(Math.random() * colors.length);
    const final = colors[index];
    console.log("Random Color:", final);

    return final;
}

export const backgroundScreen = '#252c4a';

const styles = StyleSheet.create({
    screen: {
        marginTop: width * 0.23,
        padding: width * 0.05
    },
    bottom: {
        paddingBottom: height * 0.12,
    }
});

export default styles;