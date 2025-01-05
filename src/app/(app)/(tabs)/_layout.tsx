import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AskScreen from './ask';
import HomeScreen from '.';
import ProfileScreen from './profile';

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color, size }) => (<Icon name="home" color={color} size={size} />) }} />
      <Tab.Screen name="Ask" component={AskScreen} options={{ tabBarIcon: ({ color, size }) => (<Icon name="question-answer" color={color} size={size} />) }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ({ color, size }) => (<Icon name="person" color={color} size={size} />) }} />
    </Tab.Navigator>
  );
}