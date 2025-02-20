import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, TouchableOpacity, View, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { QuizResponse, useQuizList } from "@/queries/quizzQuery";
import BackButton from "@/components/BackButton";
import BackgroundImage from "@/components/BackgroundImage";
import CustomText from "@/components/TabText";
import styles, { backgroundScreen, COLORS, fontColors, RANDOM_LIGHT_COLOR } from "@/utils/globalStyle";
import { height, scaleHeight } from "@/utils/sizeContext";
import Loading from "@/components/Loading";
import { getFromLocalStorage, setToLocalStorage } from "@/contexts/material.context";

const QuizScreen = () => {
    const route = useRoute();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { contents } = route.params as any;
    const currentMaterial = contents[0].materialParent.name;
    const size = Dimensions.get('window');

    const [quizzes, setQuiz] = useState<QuizResponse[]>([]);
    const [backgrounds, setBackgrounds] = useState<string[]>([]);
    const [backButtonColor] = useState(RANDOM_LIGHT_COLOR());

    const { mutate: fetchQuiz, isPending } = useQuizList({
        onSuccess: ({ data }) => {
            console.log("Data fetched:", data);
            setQuiz(data.data);

            const newBackgrounds = data.data.map(() => RANDOM_LIGHT_COLOR());
            setBackgrounds(newBackgrounds);
            setToLocalStorage<QuizResponse[]>(`quiz-${currentMaterial}`, data.data);
        },
        onError: (error) => {
            console.error("Error fetching data:", error.message);
        },
    });

    useEffect(() => {
        getFromLocalStorage<QuizResponse[]>(`quiz-${currentMaterial}`).then((data) => {
              if (data) {
                console.log("found data from local storage");
                const newBackgrounds = data.map(() => RANDOM_LIGHT_COLOR());
                setBackgrounds(newBackgrounds);
                setQuiz(data);
              }else {
                console.log("no data from local storage");
                fetchQuiz(currentMaterial);
              }
            });
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: backgroundScreen }}>
            <View>
                <BackgroundImage />
            </View>

            <BackButton onPress={() => navigation.goBack()} backgroundColor={backButtonColor} />

            <View style={styles.screen}>
                <CustomText fontSize={24} fontFamily="Poppins-SemiBold" style={{ textAlign: 'center', marginTop: height * 0.015 }}>
                    Test your knowledge on
                </CustomText>
                <CustomText fontSize={20} fontFamily="Poppins-SemiBold" style={{ textAlign: 'center' }}>
                    {currentMaterial.toLowerCase()}!
                </CustomText>
                {isPending ? (
                    <View style={{ marginVertical: scaleHeight(200) }}>
                        <Loading size={80} />
                    </View>
                ) : (
                    <FlatList
                        data={quizzes.sort((a, b) => a.level - b.level)}
                        contentContainerStyle={styles.bottom}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => (
                            <View className="justify-center" style={{ marginTop: size.height * 0.02 }}>
                                <TouchableOpacity
                                    className="rounded-xl elevation-lg shadow-lg"
                                    style={{
                                        width: '90%',
                                        alignSelf: 'center',
                                        padding: size.height * 0.035,
                                        backgroundColor: backgrounds[index] || `${COLORS.gold}`
                                    }}
                                    onPress={() => navigation.navigate("QuizDetail", { item })}
                                >
                                    <View className="justify-center items-center">
                                        <CustomText fontSize={20} fontColor={fontColors.black} fontFamily="Poppins-SemiBold">
                                            {item.type === "Dakuten(゛) & Handakuten(゜)" ? "Ten(゛) & Maru(゜)" : item.type}
                                        </CustomText>
                                        <CustomText fontSize={18} fontColor={fontColors.black} fontFamily="Poppins-Regular" style={{ paddingTop: 5 }}>
                                            {"Quiz Level " + item.level}
                                        </CustomText>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default QuizScreen;
