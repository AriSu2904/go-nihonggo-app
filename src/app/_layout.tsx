import "./global.css";

import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import * as SecureStore from "expo-secure-store";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SessionProvider } from "@/contexts/auth.context";
import { SnackbarProvider } from "@/contexts/snackbar.context";
import GlobalSnackbar from "@/components/GlobalSnackbar";
import { backgroundScreen } from "@/utils/globalStyle";
import { theme } from "@/constants/theme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <SnackbarProvider>
          <PaperProvider theme={theme}>
            <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen name="welcome" options={{ headerShown: false }} />
                <Stack.Screen name="sign-in" options={{ headerShown: false }} />
                <Stack.Screen name="sign-up" options={{ headerShown: false }} />
                <Stack.Screen name="(app)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar backgroundColor={backgroundScreen} style="light" />
              <GlobalSnackbar />
            </ThemeProvider>
          </PaperProvider>
        </SnackbarProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
