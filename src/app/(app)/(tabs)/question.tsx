import BackButton from "@/components/BackButton";
import BackgroundImage from "@/components/BackgroundImage";
import CenterAlert from "@/components/CenterAlert";
import CustomText from "@/components/TabText";
import { TargetAnswers, useSubmitQuiz } from "@/queries/questionQuery";
import styles, { backgroundScreen, COLORS, fontColors, RANDOM_LIGHT_COLOR } from "@/utils/globalStyle";
import { randomMessageContext } from "@/utils/reverseUtil";
import { height, width } from "@/utils/sizeContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Animated, SafeAreaView, TouchableOpacity, View, Text, Image, FlatList, Modal } from "react-native"
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import Icon from 'react-native-vector-icons/MaterialIcons';

const QuestionScreen = () => {
    const route = useRoute();
    const { quizId, questions } = route.params as any;
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    //state
    const [backButtonColor] = useState(RANDOM_LIGHT_COLOR());
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentOptionSelected, setSelectedAnswer] = useState<string | null>(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0)
    const [showNextButton, setShowNextButton] = useState(false)
    const [showScoreModal, setShowScoreModal] = useState(false)
    const [showAlert, setShowAlert] = useState(false);
    const [listAnswers, setListAnswer] = useState<TargetAnswers[]>([]);

    // mutate
    const { mutate: submitQuiz, isPending } = useSubmitQuiz({
        onSuccess: ({ data }) => {
            console.log("Submit Quiz Result:", data);
        },
        onError: (error) => {
            console.error("Error fetching submit quiz:", error.message);
        },
    })

    const handleSubmitQuiz = () => {
        const requestPayload = {
            quizId,
            answers: listAnswers,
            materialParent: questions[0].materialParent,
            section: questions[0].section,
            level: questions[0].level
        }

        submitQuiz(requestPayload)
    }

    const validateAnswer = (selectedAnswer: string) => {
        const questionId = questions[currentQuestionIndex]['id'];
        setListAnswer(prev => [
            ...prev, 
            { questionId, targetAnswer: selectedAnswer }
        ]);

        let correctAns = questions[currentQuestionIndex]['answer'];
        setSelectedAnswer(selectedAnswer);
        setCorrectAnswer(correctAns);
        setIsOptionsDisabled(true);
        if (selectedAnswer == correctAns) {
            setScore(score + 1)
        }
        setShowNextButton(true)

    }

    const handleNext = () => {
        if (currentQuestionIndex == questions.length - 1) {
            handleSubmitQuiz();
            setShowScoreModal(true)
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setCorrectAnswer(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex + 1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }

    const renderOptions = () => {
        return (
            <View style={{ marginTop: height * 0.025 }}>
                <FlatList
                    data={questions[currentQuestionIndex]?.options || []}
                    keyExtractor={(item) => item}
                    numColumns={2} 
                    columnWrapperStyle={{ justifyContent: "space-evenly" }}
                    renderItem={({ item: option }) => (
                        <TouchableOpacity
                            onPress={() => validateAnswer(option)}
                            disabled={isOptionsDisabled}
                            style={{
                                borderWidth: width * 0.004,
                                borderColor: option === correctAnswer
                                    ? COLORS.greenLime
                                    : option === currentOptionSelected
                                        ? COLORS.orange
                                        : COLORS.grey + "40",
                                backgroundColor: option === correctAnswer
                                    ? COLORS.greenLime + "20"
                                    : option === currentOptionSelected
                                        ? COLORS.orange + "20"
                                        : COLORS.grey + "20",
                                height: 60,
                                borderRadius: 20,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingHorizontal: 20,
                                marginVertical: 10,
                                width: width * 0.3,
                            }}
                        >
                            <Text style={{ fontSize: 20, color: COLORS.lightYellow }}>{option}</Text>

                            {/* Show Check or Cross Icon */}
                            {option === correctAnswer ? (
                                <View
                                    style={{
                                        width: width * 0.07,
                                        height: height * 0.04,
                                        borderRadius: 15,
                                        backgroundColor: COLORS.greenLime,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Icon name="check" style={{ color: fontColors.black, fontSize: height * 0.027 }} />
                                </View>
                            ) : option === currentOptionSelected ? (
                                <View
                                    style={{
                                        width: width * 0.07,
                                        height: height * 0.04,
                                        borderRadius: 15,
                                        backgroundColor: COLORS.orange,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Icon name="close" style={{ color: fontColors.black, fontSize: height * 0.027 }} />
                                </View>
                            ) : null}
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    };

    const renderQuestion = () => {
        return (
            <View
                className="justify-center items-center"
                style={{
                    marginTop: height * 0.03,
                }}>
                {
                    questions[currentQuestionIndex]?.questionImgDetail && (
                        <Image source={{ uri: questions[currentQuestionIndex].questionImgDetail }}
                            style={{
                                width: width * 0.6,
                                height: height * 0.3,
                                resizeMode: 'cover',
                                borderRadius: height * 0.05,
                                backgroundColor: `${COLORS.bluePastel}`
                            }}
                        />
                    )
                }
                <View style={{
                    height: height * 0.055,
                    width: width * 0.3,
                    backgroundColor: `${COLORS.bluePastel}`,
                    position: 'absolute',
                    bottom: -height * 0.00035,
                    }}>

                </View>
            </View>
        );
    }

    const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, questions.length],
        outputRange: ['0%', '100%']
    })
    const renderProgressBar = () => {
        return (
            <View className="justify-center items-center">
                <View style={{
                    width: width * 0.8,
                    height: height * 0.03,
                    borderRadius: height * 0.03,
                    backgroundColor: `${COLORS.oldGrey}`,
                    overflow: 'hidden',
                }}>
                    <Animated.View style={[{
                        height: height * 0.03,
                        borderRadius: height * 0.03,
                        backgroundColor: `${COLORS.lightGreen}`
                    }, {
                        width: progressAnim
                    }]}>

                    </Animated.View>

                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: backgroundScreen }}
        >
            <View>
                <BackgroundImage />
            </View>

            {showAlert && (
                <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center z-50 bg-black/50">
                    <CenterAlert cancelOnly={false} onCancel={() => setShowAlert(false)} onConfirm={() => navigation.goBack()}>
                        <CustomText fontSize={16} fontColor={fontColors.black} fontFamily="Poppins-SemiBold" style={{ textAlign: 'center' }}>
                            Are you sure wan't to exit?
                        </CustomText>
                        <CustomText fontSize={14} fontColor={fontColors.black} fontFamily="Poppins-Regular" style={{ textAlign: 'center' }}>
                        Your progress will not be saved!
                        </CustomText>
                    </CenterAlert>
                </View>
            )}

            {/* Back Button */}
            <BackButton onPress={() => 
                setShowAlert(true)
            } backgroundColor={backButtonColor} />

            <View style={{ marginTop: (styles.screen.marginTop) + height * 0.035 }}>
                {/* Progress Bar */}
                {renderProgressBar()}

                {/* Question */}
                {renderQuestion()}

                {/* Answer Choices */}
                {renderOptions()}

                {/* Next Button */}
                {showNextButton && (
                    <TouchableOpacity
                        onPress={handleNext}
                        style={{
                            marginTop: height * 0.007,
                            width: width * 0.7,
                            backgroundColor: COLORS.lightGreen,
                            padding: height * 0.012,
                            borderRadius: height * 0.02,
                            alignSelf: 'center',
                        }}>
                        <CustomText fontSize={18} fontColor={fontColors.black} fontFamily="Poppins-SemiBold" style={{ textAlign: 'center' }}>
                            Next
                        </CustomText>
                    </TouchableOpacity>
                )}

                {/* Score Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showScoreModal}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: backgroundScreen,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            backgroundColor: COLORS.blueKing,
                            width: '90%',
                            borderRadius: height * 0.03,
                            padding: height * 0.025,
                            alignItems: 'center'
                        }}>
                            <CustomText fontSize={28} fontColor={fontColors.black} fontFamily="Poppins-SemiBold" style={{ textAlign: 'center' }}>
                                {`Correct annswer ${score}`}
                            </CustomText>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                marginVertical: height * 0.02,
                            }}>
                                <CustomText fontSize={16} fontColor={fontColors.black} fontFamily="Poppins-Medium">
                                    {randomMessageContext(score, questions.length)}
                                </CustomText>
                            </View>
                            {/* Back to menu */}
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{
                                    backgroundColor: COLORS.grey,
                                    padding: height * 0.015, width: '90%', borderRadius: height * 0.03,
                                }}>
                                <CustomText fontSize={20} fontColor={fontColors.black} fontFamily="Poppins-SemiBold" style={{ textAlign: 'center' }}>
                                    Back
                                </CustomText>
                            </TouchableOpacity>

                        </View>

                    </View>
                </Modal>
            </View>

        </SafeAreaView>
    )
}

export default QuestionScreen;