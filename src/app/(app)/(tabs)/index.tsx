import Card from "@/components/Card";
import CustomText from "@/components/TabText";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ImageBackground, SafeAreaView } from "react-native";
import CenterAlert from "@/components/CenterAlert";
import { useSession } from "@/contexts/auth.context";
import { useStudentProgressTracker } from "@/queries/studentsQuery";
import { MaterialResponse, useListMaterials } from "@/queries/materialsQuery";
import { setMaterialBg } from "@/utils/dinamicBg";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import MaterialCard from "@/components/MaterialCard";
import BackButton from "@/components/backButton";

const HomeScreen: React.FC = () => {
  const [materials, setMaterials] = useState<MaterialResponse[]>([]);
  const [progress, setProgress] = useState<any>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertFor, setAlertFor] = useState<string>("");
  const { session, signOut } = useSession();
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
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <BackButton backgroundColor="#333333" onPress={() => signOut() } />
      <View className="flex-1 p-4">
        {
          (showAlert) && (
            <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center z-50 bg-black/50">
              <CenterAlert cancelOnly={true} onCancel={() => setShowAlert(false)} >
                {alertFor === "KANJI N5" ? (
                  <View>
                    <CustomText fontSize={16} focused={true} fontFamily="Poppins-SemiBold" style={{ textAlign: 'center' }}>
                      Coooming sooon  ⚒️
                    </CustomText>
                    <CustomText fontSize={14} focused={true} fontFamily="Poppins-Regular">
                      You still can learn other materials  ✅
                    </CustomText>
                  </View>
                ) : (
                    <CustomText fontSize={14} focused={true} fontFamily="Poppins-SemiBold" style={{ textAlign: 'center' }}>
                      Your progress will be shown below by doing the quiz 📝
                    </CustomText>
                )}
              </CenterAlert>
            </View>
          )}
        <View className="px-3 mt-20">
          <CustomText fontSize={24} focused={true} fontFamily="Poppins-SemiBold">
            Welcome, {session?.nickname}!
          </CustomText>
          <CustomText fontSize={18} focused={true} fontFamily="Poppins-Regular">
            Ready to learn today? <Text style={{ fontSize: 22 }}>🔥</Text>
          </CustomText>
          <View className="mx-1 mt-3">
            <Card focused={true} title="Your progress" borderRadius={2} alignItems="center"
              justifyContent="center"
              onPress={() => {
                setShowAlert(true);
                setAlertFor("PROGRESS");
                return;
              }}>
              <CustomText fontSize={14} focused={true} fontFamily="Poppins-Regular">
                {progress?.total}
              </CustomText>
            </Card>
          </View>
        </View>
        <View className="mt-4 justify-center items-center bg-">
          <CustomText fontSize={18} focused={true} fontFamily="Poppins-SemiBold">
            Materials
          </CustomText>
        </View>
        <ScrollView className="px-5">
          {materials.map((item) => (
            <View className="mt-3 justify-center" key={item.order}>
              <MaterialCard
                key={item.order}
                title={item.original}
                titleSize={30}
                focused={true}
                romaji={item.name}
                children={null}
                backgroundColor={setMaterialBg(item.name)}
                onPress={() => {
                  if (item.name.toUpperCase() === "KANJI N5") {
                    setShowAlert(true);
                    setAlertFor(item.name);
                    return;
                  }
                  navigator.navigate('Material', { title: item.name });
                }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;