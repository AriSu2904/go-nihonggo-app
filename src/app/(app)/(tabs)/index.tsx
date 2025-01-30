import Card from "@/components/Card";
import CustomText from "@/components/TabText";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import CenterAlert from "@/components/LogoutAlert";
import { useSession } from "@/contexts/auth.context";
import { router } from "expo-router";
import { useStudentProgressTracker } from "@/queries/studentsQuery";
import { MaterialResponse, useListMaterials } from "@/queries/materialsQuery";
import { setMaterialBg } from "@/utils/dinamicBg";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import MaterialCard from "@/components/MaterialCard";

const HomeScreen: React.FC = () => {
  const [materials, setMaterials] = useState<MaterialResponse[]>([]);
  const [progress, setProgress] = useState<any>(null);
  const { session } = useSession();
  const navigator = useNavigation<NativeStackNavigationProp<any>>();

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

  return (
    <ImageBackground source={require("../../../assets/images/jpn-bg.png")} style={{ flex: 1 }}>
      <View className="flex-1 p-4">
        <View className="px-3 mt-20">
          <CustomText fontSize={24} focused={true} fontFamily="Poppins-SemiBold">
            Welcome, {session?.nickname}!
          </CustomText>
          <CustomText fontSize={18} focused={true} fontFamily="Poppins-Regular" >
            Ready to learn today? 📌
          </CustomText>
          <View className="mx-1 mt-3">
            {progress ? (
              null
            ) : (
              <Card disabled title="You don't have any progres" borderRadius={2} alignItems="center" justifyContent="center">
                <CustomText fontSize={14} focused={true} fontFamily="Poppins-Medium">
                  Let's learn 🚀
                </CustomText>
              </Card>
            )}
          </View>
        </View>
        <View className="mt-4 justify-center items-center bg-">
          <CustomText fontSize={18} focused={true} fontFamily="Poppins-SemiBold">
            Materials
          </CustomText>
        </View>
        <ScrollView className="px-2">
          {materials.map((item) => (
            <View className="mt-3" key={item.order}>
              <MaterialCard
                key={item.order}
                title={item.original}
                romaji={item.name}
                focused={true}
                children={undefined}
                backgroundColor={setMaterialBg(item.name)}
                onPress={() => {
                  navigator.navigate("Material" as never, { title: item.name });
                }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

export default HomeScreen;