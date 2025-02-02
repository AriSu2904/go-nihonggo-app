import BackButton from "@/components/BackButton";
import CustomText from "@/components/TabText";
import styles from "@/utils/globalStyle";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, TouchableOpacity, View } from "react-native"
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

const QuestionScreen = () => {
    const route = useRoute();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { questions } = route.params as any;
    return (
        <SafeAreaView className="bg-white flex-1">

            {/* Back Button */}
            <BackButton onPress={() => navigation.goBack()} backgroundColor="#333333" />

            <View className="flex-1 p-4 justify-center items-center" style={styles.screen}>
                <TouchableOpacity onPress={() => console.log("question", questions)}>
                    <CustomText fontSize={24} focused={true} fontFamily="Poppins-SemiBold" style={{ textAlign: 'center' }}>
                        Tap
                    </CustomText>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default QuestionScreen;