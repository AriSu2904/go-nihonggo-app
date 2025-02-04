import { useEffect, useState } from "react";
import { Alert, FlatList, SafeAreaView, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { useHistoryUserQuiz } from "@/queries/historyQuery";
import { useInquiryQuestion } from "@/queries/questionQuery";
import { QuizAndQuestions, QuizResponse, useQuestionByQuizId } from "@/queries/quizzQuery";
import BackButton from "@/components/BackButton";
import CenterAlert from "@/components/CenterAlert";
import CustomText from "@/components/TabText";
import styles, { backgroundScreen, COLORS, fontColors, RANDOM_LIGHT_COLOR } from "@/utils/globalStyle";
import { hasHistoryInCurrentSection, hasLatestPoint, latestPoint, setSections } from "@/utils/reverseUtil";
import { height, width } from "@/utils/sizeContext";
import BackgroundImage from "@/components/BackgroundImage";

const QuizDetailScreen = () => {
    const route = useRoute();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { item: quizDetail } = route.params as any;

    const [quizAndQuestions, setQuizAndQuestions] = useState<QuizAndQuestions | null>(null);
    const [histories, setHistories] = useState<any[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [backgrounds, setBackgrounds] = useState<string[]>([]);
    const [backButtonColor] = useState(RANDOM_LIGHT_COLOR());

    const { mutate: fetchQuestions, isPending } = useQuestionByQuizId({
        onSuccess: ({ data }) => {
            console.log("Data Questions:", data);
            setQuizAndQuestions(data.data);

            // Generate warna unik untuk setiap question
            const newBackgrounds = data.data.questions.map(() => RANDOM_LIGHT_COLOR());
            setBackgrounds(newBackgrounds);
        },
        onError: (error) => {
            console.error("Error fetching questions:", error);
        },
    });

    const { mutate: fetchHistory, isPending: loadingHistory } = useHistoryUserQuiz({
        onSuccess: ({ data }) => {
            console.log("History Fetched:", data);
            setHistories(data.data);
        },
        onError: (error) => {
            console.error("Error fetching history:", error);
        },
    });

    const { mutate: inquiryQuiz, isPending: inquiryPending } = useInquiryQuestion({
        onSuccess: ({ data }) => {
            console.log("Inquiry Result:", data);
        },
        onError: (error) => {
            console.error("Error fetching inquiry:", error.message);
        },
    });

    useEffect(() => {
        fetchQuestions({ materialName: quizDetail.materialParent, id: quizDetail.id });
        
        const unsubscribe = navigation.addListener("focus", () => {
            fetchHistory(quizDetail.id);
        }   );

        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: backgroundScreen, zIndex: 5 }}>
            <View>
                <BackgroundImage />
            </View>

            <BackButton onPress={() => navigation.goBack()} backgroundColor={backButtonColor} iconColor="black" />

            {showAlert && (
                <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center z-50 bg-black/50">
                    <CenterAlert cancelOnly={true} onCancel={() => setShowAlert(false)} >
                        <CustomText fontSize={16} fontColor={fontColors.black} fontFamily="Poppins-SemiBold" style={{ textAlign: 'center' }}>
                            Before starting this section, you need to finish the previous section!
                        </CustomText>
                    </CenterAlert>
                </View>
            )}

            <View className="justify-center items-center" style={styles.screen}>
                <CustomText fontSize={20} fontFamily="Poppins-SemiBold" style={{ textAlign: 'center' }}>
                    {quizDetail.type === "Dakuten(゛) & Handakuten(゜)" ? "Ten(゛) & Maru(゜)" : quizDetail.type}
                </CustomText>
            </View>

            <FlatList
                data={quizAndQuestions?.questions}
                keyExtractor={(item) => item.section}
                renderItem={({ item, index }) => (
                    <View className="justify-center items-center" style={{ marginTop: height * 0.03, zIndex: 5 }}>
                        <View style={{ width: '90%' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (hasHistoryInCurrentSection(histories, item.section)) {
                                        inquiryQuiz({ quizId: quizDetail.id, materialParent: quizDetail.materialParent, level: quizDetail.level, section: item.section });

                                        console.log(`Navigating to QuestionScreen with section ${item.section}, level ${quizDetail.level}, material ${quizDetail.materialParent}`);
                                        navigation.navigate("QuestionScreen", { quizId: quizDetail.id ,questions: item.groupedQuestion });
                                    } else {
                                        setShowAlert(true);
                                    }
                                }}
                                className="rounded-xl"
                                style={{
                                    backgroundColor: hasHistoryInCurrentSection(histories, item.section)
                                        ? backgrounds[index] || COLORS.gold
                                        : "#626262",
                                    shadowColor: COLORS.gold,
                                    shadowOffset: { width: 4, height: 4 },
                                    shadowOpacity: 0.6,
                                    shadowRadius: 5,
                                    elevation: width * 0.02,
                                }}
                            >
                                <View style={{ padding: height * 0.025 }}>
                                    <View className="flex-row justify-between">
                                        <CustomText fontSize={20} fontColor={fontColors.black} fontFamily="Poppins-SemiBold">
                                            {setSections(item.section, quizDetail.type)?.title}
                                        </CustomText>
                                        {hasLatestPoint(histories, item.section) && (
                                            <CustomText fontSize={14} fontColor={fontColors.black} fontFamily="Poppins-Regular">
                                                Latest points
                                            </CustomText>
                                        )}
                                    </View>
                                    <View className="flex-row justify-between">
                                        <CustomText fontSize={12} fontColor={fontColors.black} fontFamily="Poppins-Regular">
                                            {setSections(item.section, quizDetail.type)?.description}
                                        </CustomText>
                                        {hasLatestPoint(histories, item.section) && (
                                            <CustomText fontSize={14} fontColor={fontColors.black} fontFamily="Poppins-SemiBold">
                                                {latestPoint(histories, item.section)}
                                            </CustomText>
                                        )}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default QuizDetailScreen;
