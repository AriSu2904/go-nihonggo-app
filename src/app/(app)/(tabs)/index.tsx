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
import styles, {
  backgroundScreen,
  COLORS,
  fontColors,
  RANDOM_LIGHT_COLOR,
} from "@/utils/globalStyle";
import BackgroundImage from "@/components/BackgroundImage";
import { height, scaleHeight, width } from "@/utils/sizeContext";
import { generateQuizName } from "@/utils/materialUtil";
import { getSection, randomIcons } from "@/utils/reverseUtil";
import Loading from "@/components/Loading";
import { setToLocalStorage, getFromLocalStorage } from "@/contexts/material.context";

const HomeScreen: React.FC = () => {
  const [materials, setMaterials] = useState<MaterialResponse[]>([]);
  const [progress, setProgress] = useState<StudentProgressResponse>();
  const [showAlert, setShowAlert] = useState(false);
  const [alertFor, setAlertFor] = useState<string>("");
  const [backgrounds, setBackgrounds] = useState<string[]>([]);
  const navigator = useNavigation<NativeStackNavigationProp<any>>();
  const { session } = useSession();

  const { data, isLoading, error, refetch } = useStudentProgressTracker();

  const { mutate: fetchMaterials, isPending: loadingFetchMaterial } = useListMaterials({
    onSuccess: ({ data }) => {
      setMaterials(data.data);
  
      const newBackgrounds = data.data.map(() => RANDOM_LIGHT_COLOR());
      setBackgrounds(newBackgrounds);
  
      setToLocalStorage<MaterialResponse[]>("materials", data.data);
    },
    onError: (error) => {
      console.error("Error fetching data:", error);
    },
  });
  
  useEffect(() => {
    getFromLocalStorage<MaterialResponse[]>("materials").then((data) => {
      if (data) {
        console.log("found data from local storage");
        const newBackgrounds = data.map(() => RANDOM_LIGHT_COLOR());
        setBackgrounds(newBackgrounds);
        setMaterials(data);
      } else {
        console.log("no data from local storage");
        fetchMaterials();
      }
    });
  
    if (data) {
      setProgress(data.data.data);
    }
  }, [data, fetchMaterials]); // Tambahkan dependencies agar selalu update
  
  useEffect(() => {
    const unsubscribe = navigator.addListener("focus", () => {
      refetch(); // Gunakan refetch dari useStudentProgressTracker
    });
  
    return () => unsubscribe(); // Cleanup event listener saat unmount
  }, [refetch]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundScreen }}>
      {/* Background Image */}
      <View>
        <BackgroundImage />
      </View>
      <View className="flex-1 p-4">
        {showAlert && (
          <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center z-50 bg-black/50">
            <CenterAlert cancelOnly={true} onCancel={() => setShowAlert(false)}>
              {alertFor === "KANJI N5" ? (
                <View>
                  <CustomText
                    fontSize={16}
                    fontColor={fontColors.black}
                    fontFamily="Poppins-SemiBold"
                    style={{ textAlign: "center" }}
                  >
                    Coming soon ⚒️
                  </CustomText>
                  <CustomText
                    fontSize={14}
                    fontColor={fontColors.black}
                    fontFamily="Poppins-Regular"
                  >
                    You still can learn other materials ✅
                  </CustomText>
                </View>
              ) : (
                <CustomText
                  fontSize={14}
                  fontColor={fontColors.black}
                  fontFamily="Poppins-SemiBold"
                  style={{ textAlign: "center" }}
                >
                  Your activity will be shown below by completing the quiz 📝
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
            Ready to learn today? <Text style={{ fontSize: 22 }}>{randomIcons()}</Text>
          </CustomText>
          <View style={{ marginTop: height * 0.025, minHeight: scaleHeight(50) }}>
            <Card
              focused={true}
              title="Last activity"
              borderRadius={2}
              onPress={() => {
                setShowAlert(true);
                setAlertFor("PROGRESS");
                return;
              }}
            >
              {isLoading ? (
                <View style={{ marginVertical: height * 0.03 }}>
                  <Loading size={35} />
                </View>
              ) : (
                <View>
                  {progress ? (
                    <View>
                      {progress.inquiryUsed === true ? (
                        <View>
                          <View className="justify-center items-center">
                            <CustomText
                              fontSize={16}
                              fontFamily="Poppins-SemiBold"
                              fontColor="black"
                            >
                              {progress.materialParent}
                            </CustomText>
                          </View>
                          <View className="justify-around flex-row">
                            <CustomText fontSize={14} fontFamily="Poppins-Medium" fontColor="black">
                              {generateQuizName(progress.quizLevel)} -{" "}
                              {getSection(progress.section)}
                            </CustomText>
                            <CustomText
                              fontSize={14}
                              fontFamily="Poppins-Regular"
                              fontColor="black"
                            >
                              Last score{" "}
                              <CustomText
                                fontSize={14}
                                fontFamily="Poppins-SemiBold"
                                fontColor="black"
                              >
                                {(progress.currentScore * 10).toFixed(2)}%
                              </CustomText>
                            </CustomText>
                          </View>
                        </View>
                      ) : (
                        <View className="justify-center items-center">
                          <CustomText
                            fontSize={width * 0.04}
                            fontFamily="Poppins-Regular"
                            fontColor="black"
                          >
                            Complete your{" "}
                            <CustomText
                              fontSize={width * 0.04}
                              fontFamily="Poppins-SemiBold"
                              fontColor="black"
                            >
                              {generateQuizName(progress.quizLevel)}
                            </CustomText>{" "}
                            quiz
                          </CustomText>
                          <CustomText
                            fontSize={width * 0.03}
                            fontFamily="Poppins-Regular"
                            fontColor="black"
                          >
                            {getSection(progress.section)} on{" "}
                            <CustomText
                              fontSize={width * 0.03}
                              fontFamily="Poppins-SemiBold"
                              fontColor="black"
                            >
                              {progress.materialParent}
                            </CustomText>{" "}
                            to get points! 🚀
                          </CustomText>
                        </View>
                      )}
                    </View>
                  ) : (
                    <View className="justify-center items-center">
                      <CustomText fontSize={16} fontFamily="Poppins-Medium" fontColor="black">
                        No progress yet. Let's start learning! 🚀
                      </CustomText>
                    </View>
                  )}
                </View>
              )}
            </Card>
          </View>
        </View>
        <View className="justify-center items-center">
          <CustomText fontSize={18} fontFamily="Poppins-SemiBold">
            Materials
          </CustomText>
        </View>
        {loadingFetchMaterial ? (
          <View style={{ marginVertical: height * 0.5 }}>
            <Loading size={170} />
          </View>
        ) : (
          <View className="flex-1">
            <FlatList
              data={materials}
              keyExtractor={(item) => item.order.toString()}
              contentContainerStyle={{
                paddingHorizontal: height * 0.009,
                paddingBottom: height * 0.1,
              }}
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
                      console.log("Navigating to material", item.name);

                      navigator.navigate("Material", { title: item.name });
                    }}
                  />
                </View>
              )}
            />
          </View>
        )
        }
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
