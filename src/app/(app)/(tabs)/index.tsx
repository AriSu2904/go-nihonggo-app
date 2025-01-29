import Card from "@/components/Card";
import CustomText from "@/components/TabText";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import CenterAlert from "@/components/LogoutAlert";
import { useSession } from "@/contexts/auth.context";
import { router } from "expo-router";
import { useStudentProgressTracker } from "@/queries/studentsQuery";
import { useListMaterials } from "@/queries/materialsQuery";
import { setMaterialBg } from "@/utils/dinamicBg";

const HomeScreen: React.FC = () => {
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [materials, setMaterials] = useState<{ order: number; name: string; description: string; createdBy: string; createdAt: string; }[]>([]);
  const [progress, setProgress] = useState<any>([]);
  const { signOut, session } = useSession();

  const { mutate: fetchProgress, isPending } = useStudentProgressTracker({
    onSuccess: ({ data }) => {
      console.log("Data fetched:", data);
      setProgress(data.data);
    },
    onError: (error) => {
      console.error("Error fetching data:", error.message);
    },
  });

  const { mutate: fetchMaterials, isPending: loadingFetchMaterial } = useListMaterials({
    onSuccess: ({ data }) => {
      console.log("Data fetched:", data.data);
      setMaterials(data.data);
    },
    onError: (error) => {
      console.error("Error fetching data:", error);
    },
  });

  useEffect(() => {
    // fetchProgress();
    fetchMaterials();
  }, []);

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
    <View className="flex-1 p-4">
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
      <View className="px-3">
        <CustomText fontSize={24} focused={true} fontFamily="Poppins-SemiBold">
          Welcome, {session?.nickname}!
        </CustomText>
        <CustomText fontSize={18} focused={true} fontFamily="Poppins-Regular" >
          Ready to learn today?
        </CustomText>
        <View className="mx-1 mt-3">
          <Card disabled title="Your last progress" borderRadius={2} alignItems="center" justifyContent="center">
            <CustomText fontSize={14} focused={true} fontFamily="Poppins-Regular">
              {progress ? progress.materialParent : "You don't have any progress, let's learn!"}
            </CustomText>
            <CustomText fontSize={14} focused={true} fontFamily="Poppins-Regular">
              {progress ? `Total Attempt: ${progress.totalAttempt}` : ""}
            </CustomText>
            <CustomText fontSize={14} focused={true} fontFamily="Poppins-Regular">
              {progress ? `Highest Score: ${progress.highestScore}` : ""}
            </CustomText>
          </Card>
        </View>
      </View>
      <View className="mt-4 justify-center items-center bg-">
        <CustomText fontSize={18} focused={true} fontFamily="Poppins-SemiBold">
          Materials
        </CustomText>
      </View>
      <ScrollView className="px-2">
        {materials.map((item) => (
          <View className="mt-2" key={item.order}>
            <Card
              key={item.order}
              title={item.name}
              borderRadius={12}
              titleSize={18}
              alignItems="center"
              justifyContent="center"
              focused={true}
              children={undefined}
              backgroundColor={setMaterialBg(item.name)}
              onPress={() => console.log("Card clicked ", item.name)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default HomeScreen;