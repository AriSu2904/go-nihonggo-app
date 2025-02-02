import BackButton from "@/components/BackButton";
import MaterialCard from "@/components/MaterialCard";
import CustomText from "@/components/TabText";
import { QuizResponse, useQuizList } from "@/queries/quizzQuery";
import { setMaterialBg } from "@/utils/reverseUtil";
import styles from "@/utils/globalStyle";
import { useNavigation, useRoute } from "@react-navigation/native"
import { useState } from "react";
import { Dimensions, FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-paper";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

const QuizScreen = () => {
    const route = useRoute();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { contents } = route.params as any;
    const [quizzes, setQuiz] = useState<QuizResponse[]>([]);
    const currentMaterial = contents[0].materialParent.name;
    const size = Dimensions.get('window');

    const { mutate: fetchQuiz, isPending } = useQuizList({
        onSuccess: ({ data }) => {
            console.log("Data fetched:", data);
            setQuiz(data.data);
        },
        onError: (error) => {
            console.error("Error fetching data:", error.message);
        },
    });

    useState(() => {
        fetchQuiz(currentMaterial);
    });
    return (
        <SafeAreaView className="flex-1 bg-[#F8F9FA]">

            {/* Back Button */}
            <BackButton onPress={() => navigation.goBack()} backgroundColor="#333333" />

            <View style={styles.screen}>
                <CustomText fontSize={24} focused={true} fontFamily="Poppins-SemiBold" style={{ textAlign: 'center' }}>
                    Test your knowledge on
                </CustomText>
                <CustomText fontSize={20} focused={true} fontFamily="Poppins-SemiBold" style={{ textAlign: 'center' }}>
                    {currentMaterial.toLowerCase()}!
                </CustomText>
                <FlatList
                    data={quizzes.sort((a, b) => a.level - b.level)}
                    contentContainerStyle={styles.bottom}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View className="justify-center" style={{ marginTop: size.height * 0.02 }}>
                            <TouchableOpacity
                                className="bg-white rounded-xl elevation-lg shadow-lg"
                                style={{ width: '90%', alignSelf: 'center', padding: size.height * 0.035 }}
                                onPress={() => navigation.navigate("QuizDetail", { item })}>
                                <View className="justify-center items-center">
                                    <CustomText fontSize={20} focused={true} fontFamily="Poppins-SemiBold">
                                    {item.type === "Dakuten(゛) & Handakuten(゜)" ? "Ten(゛) & Maru(゜)" : item.type}
                                    </CustomText>
                                    <CustomText fontSize={18} focused={true} fontFamily="Poppins-Regular" style={{ paddingTop: 5 }}>
                                        {"Quiz Level " + item.level}
                                    </CustomText>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

export default QuizScreen;