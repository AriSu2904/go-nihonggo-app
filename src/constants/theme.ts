import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    primary: "#F23B3B",
  },
};
