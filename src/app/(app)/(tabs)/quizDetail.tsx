import BackButton from "@/components/BackButton";
import CenterAlert from "@/components/CenterAlert";
import CustomText from "@/components/TabText";
import { useHistoryUserQuiz } from "@/queries/historyQuery";
import { useInquiryQuestion } from "@/queries/questionQuery";
import { QuizAndQuestions, QuizResponse, useQuestionByQuizId } from "@/queries/quizzQuery";
import styles from "@/utils/globalStyle";
import { hasHistoryInCurrentSection, hasLatestPoint, latestPoint, setSections } from "@/utils/reverseUtil";
import { height } from "@/utils/sizeContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

const QuizDetailScreen = () => {
    const route = useRoute();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { item: quizDetail } = route.params as any;
    const [quizAndQuestions, setQuizAndQuestions] = useState<QuizAndQuestions | null>(null);
    const [histories, setHistories] = useState<any[]>([]);
    const [showAlert, setShowAlert] = useState(false);

    const { mutate: fetchQuestions, isPending } = useQuestionByQuizId({
        onSuccess: ({ data }) => {
            console.log("data", data);
            setQuizAndQuestions(data.data)
        },
        onError: (error) => {
            console.log("error", error);
        },
    });

    const { mutate: fetchHistory, isPending: loadingHistory } = useHistoryUserQuiz({
        onSuccess: ({ data }) => {
            console.log("history fetched:", data);
            setHistories(data.data);
        },
        onError: (error) => {
            console.error("Error fetching data:", error);
        },
    });

    const {mutate: inquiryQuiz, isPending: inquiryPending } = useInquiryQuestion({
        onSuccess: ({ data}) => {
            console.log("Inquiry Result:", data);
        },
        onError: (error) => {
            console.error("Error fetching data:", error.message);
        },
    })

    useEffect(() => {
        fetchQuestions({ materialName: quizDetail.materialParent, id: quizDetail.id });
        fetchHistory(quizDetail.id);
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-[#F8F9FA]">
            {/* Back Button */}
            <BackButton onPress={() => navigation.goBack()} backgroundColor="#333333" />

            {showAlert && (
                <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center z-50 bg-black/50">
                    <CenterAlert cancelOnly={true} onCancel={() => setShowAlert(false)} >
                        <CustomText fontSize={16} focused={true} fontFamily="Poppins-SemiBold" style={{ textAlign: 'center' }}>
                            Before start this section, you need to finish quiz in the previous section!
                        </CustomText>
                    </CenterAlert>
                </View>
            )}

            <View className="justify-center items-center" style={styles.screen}>
                <CustomText fontSize={20} focused={true} fontFamily="Poppins-SemiBold" style={{ textAlign: 'center' }}>
                    {quizDetail.type === "Dakuten(゛) & Handakuten(゜)" ? "Ten(゛) & Maru(゜)" : quizDetail.type}
                </CustomText>
            </View>

            <FlatList
                data={quizAndQuestions?.questions}
                keyExtractor={(item) => item.section}
                renderItem={({ item }) => (
                    <View className="justify-center items-center" style={{ marginTop: height * 0.02 }}>
                        <View style={{ width: '90%' }}>
                            <TouchableOpacity onPress={() => {
                                if (hasHistoryInCurrentSection(histories, item.section)) {
                                    inquiryQuiz({ quizId: quizDetail.id, materialParent: quizDetail.materialParent, level: quizDetail.level, section: item.section });

                                    console.log(`navigate to question screen with section ${item.section} level ${quizDetail.level} material ${quizDetail.materialParent}`);

                                    navigation.navigate("QuestionScreen", { questions: item.groupedQuestion });
                                } else {
                                    setShowAlert(true);
                                }
                            }}
                                className={`${hasHistoryInCurrentSection(histories, item.section) ? "bg-white elevation-xl shadow-lg" : "bg-[#d4d4d4]"} rounded-xl`}>
                                <View style={{ padding: height * 0.02 }}>
                                    <View className="flex-row justify-between">
                                        <CustomText fontSize={20} focused={true} fontFamily="Poppins-SemiBold">
                                            {setSections(item.section, quizDetail.type)?.title}
                                        </CustomText>
                                        {hasLatestPoint(histories, item.section) && (
                                            <CustomText fontSize={14} focused={true} fontFamily="Poppins-Regular">
                                                <Text>Latest point</Text>
                                            </CustomText>
                                        )}
                                    </View>
                                    <View className="flex-row justify-between">
                                        <CustomText fontSize={14} focused={true} fontFamily="Poppins-Regular" style={{ padding: height * 0.01 }}>
                                            {setSections(item.section, quizDetail.type)?.description}
                                        </CustomText>
                                        {hasLatestPoint(histories, item.section) && (
                                            <CustomText fontSize={14} focused={true} fontFamily="Poppins-SemiBold">
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