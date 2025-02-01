import BackButton from "@/components/backButton";
import MaterialCard from "@/components/MaterialCard";
import CustomText from "@/components/TabText";
import { QuizResponse, useQuizList } from "@/queries/quizzQuery";
import { setMaterialBg } from "@/utils/dinamicBg";
import { useNavigation, useRoute } from "@react-navigation/native"
import { useState } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

const QuizScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { contents } = route.params as any;
    const [quizzes, setQuiz] = useState<QuizResponse[]>([]);
    const currentMaterial = contents[0].materialParent.name;
    const listLevel = contents.map((content: any) => content.position);

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
            <View style={{ height: 70 }} className='mt-7'>
                <BackButton onPress={() => console.log(listLevel)} backgroundColor="#333333" />
            </View>

            <View>
                <CustomText fontSize={20} focused={true} fontFamily="Poppins-SemiBold" style={{ textAlign: 'center' }}>
                    test your knowledge on
                </CustomText>
                <CustomText fontSize={16} focused={true} fontFamily="Poppins-SemiBold" style={{ textAlign: 'center' }}>
                    {currentMaterial.toLowerCase()}!
                </CustomText>
            </View>

            <ScrollView className="px-5">
                {quizzes.map((item) => (
                    <View className="mt-3 justify-center" key={item.id}>
                        <MaterialCard
                            key={item.id}
                            title={item.level.toString()}
                            titleSize={30}
                            focused={true}
                            romaji={""}
                            children={null}
                            backgroundColor="bg-red-400"
                            onPress={() => {
                                console.log("Pressed:", item.level);
                            }}
                        />
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default QuizScreen;