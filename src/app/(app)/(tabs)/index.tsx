import Card from "@/components/Card";
import CustomText from "@/components/TabText";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import CenterAlert from "@/components/LogoutAlert";
import { useSession } from "@/contexts/auth.context";
import { router } from "expo-router";

const HomeScreen: React.FC = () => {
  const [isAlertVisible, setAlertVisible] = useState(false);
  const { signOut } = useSession();


  const handleLogout = () => {
    console.log("User logged out");
    signOut();
    setAlertVisible(false);

    router.replace("/sign-in");
  };

  const handleCancel = () => {
    console.log("Logout cancelled");
    setAlertVisible(false);
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <View className="h-16 justify-center items-end mt-1">
        <TouchableOpacity className="p-2" onPress={() => setAlertVisible(true)}>
          <Icon name="exit-to-app" color="black" size={28} />
        </TouchableOpacity>
        <CenterAlert
          visible={isAlertVisible}
          onConfirm={handleLogout}
          onCancel={handleCancel}
        >
          <CustomText fontSize={18} focused={true} fontFamily="Poppins-SemiBold">
            Are you sure you want to logout?
          </CustomText>
        </CenterAlert>
      </View>
      <View className="flex-1 p-3">
        <CustomText fontSize={24} focused={true} fontFamily="Poppins-SemiBold">
          Welcome, User!
        </CustomText>
        <CustomText fontSize={18} focused={true} fontFamily="Poppins-Regular" >
          Ready to learn today?
        </CustomText>
        <View className="mx-1 mt-3 rounded-">
          <Card disabled title="Your last progress" content="Content 1" borderRadius={2}>
            <View className="pt-2">
              <Text>Content 1</Text>
            </View>
          </Card>
        </View>
      </View>
      <View className="flex-1 justify-center items-center border-2 border-gray-200">
        <Text className="font-poppins text-xl">TEST3</Text>
      </View>
    </View>
  );
}

export default HomeScreen;