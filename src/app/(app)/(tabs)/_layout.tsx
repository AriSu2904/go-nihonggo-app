import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AskScreen from "./ask";
import HomeScreen from ".";
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from "./profile";
import CustomText from "@/components/TabText"; // Pastikan CustomText tersedia
import MaterialScreen from "./material";

const Tab = createBottomTabNavigator();



const HomeStack = createStackNavigator();

function SectionHome() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="Material" component={MaterialScreen} />
    </HomeStack.Navigator>
  )
}

export default function Home() {
  return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false, // Menyembunyikan header
          tabBarStyle: {
            borderTopWidth: 0.2,
            height: 70,
            position: "absolute",
            backgroundColor: "white",
          }
        }}
      >
        <Tab.Screen
          name="Home"
          component={SectionHome}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="home-filled" color={focused ? "#333333" : "#999999"} size={32} />
            ),
            tabBarLabel: ({ focused }) => (
              <View style={{ flexDirection: "column", alignItems: "center", marginTop: 8 }}>
                <CustomText focused={focused} fontSize={13}>
                  Home
                </CustomText>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Ask"
          component={AskScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name={focused ? "messenger" : "messenger-outline"} color={focused ? "#333333" : "#999999"} size={32} />
            ),
            tabBarLabel: ({ focused }) => (
              <View style={{ flexDirection: "column", alignItems: "center", marginTop: 8 }}>
                <CustomText focused={focused} fontSize={13}>
                  Ask
                </CustomText>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name={focused ? "person" : "person-outline"} color={focused ? "#333333" : "#999999"} size={32} />
            ),
            tabBarLabel: ({ focused }) => (
              <View style={{ flexDirection: "column", alignItems: "center", marginTop: 8 }}>
                <CustomText focused={focused} fontSize={13}>
                  Profile
                </CustomText>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
  );
}
