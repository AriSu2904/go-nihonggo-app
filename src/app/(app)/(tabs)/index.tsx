import Card from "@/components/Card";
import CustomText from "@/components/TabText";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import CenterAlert from "@/components/CenterAlert";
import { useSession } from "@/contexts/auth.context";
import { StudentProgressResponse, useStudentProgressTracker } from "@/queries/studentsQuery";
import { MaterialResponse, useListMaterials } from "@/queries/materialsQuery";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import MaterialCard from "@/components/MaterialCard";
import { mockData } from "@/lib/dev/mock-data";
import styles, { backgroundScreen, COLORS, fontColors, RANDOM_LIGHT_COLOR } from "@/utils/globalStyle";
import BackgroundImage from "@/components/BackgroundImage";
import BackButton from "@/components/BackButton";

const HomeScreen: React.FC = () => {
  const [materials, setMaterials] = useState<MaterialResponse[]>([]);
  const [progress, setProgress] = useState<StudentProgressResponse>();
  const [showAlert, setShowAlert] = useState(false);
  const [alertFor, setAlertFor] = useState<string>("");
  const [backgrounds, setBackgrounds] = useState<string[]>([]);
  const navigator = useNavigation<NativeStackNavigationProp<any>>();
  const { session, signOut } = useSession();

  const { mutate: fetchProgress, isPending } = useStudentProgressTracker({
    onSuccess: ({ data }) => {
      console.log("Fetched Progress User:", data);
      setProgress(data.data);
    },
    onError: (error) => {
      console.error("Error fetching data:", error.message);
    },
  });

  const { mutate: fetchMaterials, isPending: loadingFetchMaterial } = useListMaterials({
    onSuccess: ({ data }) => {
      console.log("Fetched Materials: ", data.data);
      setMaterials(data.data);

      const newBackgrounds = data.data.map(() => RANDOM_LIGHT_COLOR());

      setBackgrounds(newBackgrounds);
    },
    onError: (error) => {
      console.error("Error fetching data:", error);
    },
  });

  useEffect(() => {
    fetchMaterials();
    
    const unsubscribe = navigator.addListener('focus', () => {
      fetchProgress();
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundScreen }}>
      {/* Background Image */}
      <View>
        <BackgroundImage />
      </View>
      <BackButton backgroundColor="#333333" onPress={() => signOut()} />
      <View className="flex-1 p-4">
        {
          (showAlert) && (
            <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center z-50 bg-black/50">
              <CenterAlert cancelOnly={true} onCancel={() => setShowAlert(false)} >
                {alertFor === "KANJI N5" ? (
                  <View>
                    <CustomText fontSize={16} fontColor={fontColors.black} fontFamily="Poppins-SemiBold" style={{ textAlign: 'center' }} >
                      Coming soon  ⚒️
                    </CustomText>
                    <CustomText fontSize={14} fontColor={fontColors.black} fontFamily="Poppins-Regular">
                      You still can learn other materials  ✅
                    </CustomText>
                  </View>
                ) : (
                  <CustomText fontSize={14} fontColor={fontColors.black} fontFamily="Poppins-SemiBold" style={{ textAlign: 'center' }}>
                    Your progress will be shown below by completing the quiz 📝
                  </CustomText>
                )}
              </CenterAlert>
            </View>
          )}
        <View className="px-3" style={styles.screen}>
          <CustomText fontSize={24} fontFamily="Poppins-SemiBold">
            Welcome, {session?.nickname}!
          </CustomText>
          <CustomText fontSize={18} fontFamily="Poppins-Regular">
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
              <View className="flex-row justify-between items-center">
                <CustomText fontSize={14} fontColor="#000" fontFamily="Poppins-Regular">
                  {progress?.highestScore}
                </CustomText>
              </View>
            </Card>
          </View>
        </View>
        <View className="mt-4 justify-center items-center bg-">
          <CustomText fontSize={18} fontFamily="Poppins-SemiBold">
            Materials
          </CustomText>
        </View>
        <FlatList
          data={materials}
          keyExtractor={(item) => item.order.toString()}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          renderItem={({ item, index }) => (
            <View className="mt-3 justify-center" key={item.order}>
              <MaterialCard
                title={item.original}
                titleSize={30}
                focused={true}
                romaji={item.name}
                children={null}
                backgroundColor={backgrounds[index] || COLORS.greenLime}
                onPress={() => {
                  if (item.name.toUpperCase() === "KANJI N5") {
                    setShowAlert(true);
                    setAlertFor(item.name);
                    return;
                  }
                  navigator.navigate('Material', { title: item.name });
                }}
              />
            </View>)}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
