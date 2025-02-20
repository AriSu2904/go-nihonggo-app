import BackButton from "@/components/BackButton";
import BackgroundImage from "@/components/BackgroundImage";
import CenterAlert from "@/components/CenterAlert";
import Loading from "@/components/Loading";
import CustomText from "@/components/TabText";
import { mockData } from "@/lib/dev/mock-data";
import { useMaterialContent } from "@/queries/materialsQuery";
import styles, { backgroundScreen, COLORS, fontColors, RANDOM_LIGHT_COLOR } from "@/utils/globalStyle";
import style from "@/utils/globalStyle";
import { height, scaleHeight } from "@/utils/sizeContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, TouchableOpacity, Image, Text, ScrollView } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function MaterialScreen() {
    const route = useRoute();
    const { title } = route.params as { title: string };
    const [contents, setContents] = useState<any[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [material, setMaterial] = useState<string>("");
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [backButtonColor] = useState(RANDOM_LIGHT_COLOR());

    const { mutate: fetchContent, isPending } = useMaterialContent({
        onSuccess: ({ data }) => {
            console.log("Fetched Material contents: ", data);
            setContents(data.data);
        },
        onError: (error) => {
            console.error("Error fetching data:", error.message);
        },
    });

    useEffect(() => {
        fetchContent(title);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: backgroundScreen }}>
            <View>
                <BackgroundImage />
            </View>

            { /* back button */}
            <BackButton onPress={() => navigation.goBack()} backgroundColor={backButtonColor} />

            {/* Alert */}
            {showAlert && (
                <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center z-50 bg-slate-800/50">
                    <CenterAlert cancelOnly={true} onCancel={() => setShowAlert(false)} >
                        <CustomText fontSize={14} fontColor={fontColors.black} fontFamily="Poppins-Regular">
                            <View className="justify-center items-center">
                                <CustomText fontSize={16} fontColor={fontColors.black} fontFamily="Poppins-SemiBold" style={{ textAlign: 'center' }}>
                                    {material === "Ten&Maru" ? "Tenten (゛) & Maru (゜)" : "Yōon (拗音)"}
                                </CustomText>
                                <CustomText fontSize={14} fontColor={fontColors.black} fontFamily="Poppins-Regular" style={{ textAlign: 'center' }}>
                                    {material === "Ten&Maru" ? "Tenten (゛) and Maru (゜) are diacritics used in the Japanese writing system to indicate that the consonant of a syllable should be pronounced voiced, or that a voiceless consonant should be pronounced with a nasal sound." : "Yōon (拗音) are kana characters that represent a combination of two sounds, usually a consonant followed by a glide."}
                                </CustomText>
                                {material === "Ten&Maru" ? (
                                    title === "HIRAGANA" ? (
                                        <View className="flex-row justify-center items-center">
                                            <Image source={require("../../../assets/images/dakuten.png")}
                                                resizeMode="stretch"
                                                className="w-40 h-36 rounded-3xl my-2" />
                                            <Image source={require("../../../assets/images/handakuten.png")}
                                                resizeMode="stretch"
                                                className="w-40 h-36 rounded-3xl my-2" />
                                        </View>
                                    ) : (
                                        <View className="flex-row justify-center items-center">
                                            <Image source={require("../../../assets/images/kata-dakuten.png")}
                                                resizeMode="stretch"
                                                className="w-52 h-36 rounded-3xl my-2" />
                                        </View>
                                    )
                                ) : (
                                    <View>
                                        <CustomText fontSize={14} fontColor={fontColors.black} fontFamily="Poppins-Regular" style={{ textAlign: 'center' }}>
                                            {`Example in ${title}`}
                                        </CustomText>
                                        <CustomText fontSize={18} fontColor={fontColors.black} fontFamily="Poppins-SemiBold" style={{ textAlign: 'center', marginTop: 10 }}>
                                            {title === "HIRAGANA" ? "きょ (Kyo)" : "キョ (Kyo)"}
                                        </CustomText>
                                    </View>
                                )}
                            </View>
                        </CustomText>
                    </CenterAlert>
                </View>
            )}

            {/* Judul */}

            <View className="p-4 justify-center items-center"
                style={style.screen}
            >
                <CustomText fontSize={24} fontFamily="Poppins-SemiBold">
                    {title}
                </CustomText>
                <CustomText fontSize={20} fontFamily="Poppins-Regular">
                    Choose a section
                </CustomText>
            </View>
            <View className="flex-1">
                {isPending ? (
                    <View style={{ marginVertical: scaleHeight(200) }}>
                        <Loading size={80} />
                    </View>
                ) : (
                    <FlatList
                        data={contents}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: "space-evenly" }}
                        contentContainerStyle={styles.bottom}
                        renderItem={({ item }) => (
                            <View>
                                <TouchableOpacity
                                    className="rounded-2xl"
                                    onPress={() => {
                                        console.log("Navigating to ", item.name);

                                        item.name === "Quiz" ? navigation.navigate('Quiz', { material: title, contents })
                                            : navigation.navigate('Letter', { materialName: title, level: item.position })
                                    }}
                                >
                                    <View className="rounded-2xl">
                                        <Image
                                            source={{ uri: item.imageUri }}
                                            resizeMode="stretch"
                                            className="w-48 h-44 rounded-3xl"
                                        />
                                    </View>
                                </TouchableOpacity>

                                {/* Teks */}
                                <View className="justify-center items-center w-48 p-2">
                                    <View className="flex-row justify-between">
                                        <CustomText fontSize={16} fontFamily="Poppins-SemiBold">
                                            {item.name}
                                        </CustomText>

                                        {(item.name === "Ten&Maru" || item.name === "Yōon") && (
                                            <TouchableOpacity className="ml-1"
                                                onPress={() => {
                                                    setShowAlert(true);
                                                    setMaterial(item.name);
                                                }}
                                            >
                                                <Icon name="help-outline" color="white" size={15} />
                                            </TouchableOpacity>
                                        )}
                                    </View>

                                    <CustomText fontSize={13} fontFamily="Poppins-Regular" style={{ textAlign: "center" }}>
                                        {item.description}
                                    </CustomText>
                                </View>
                            </View>
                        )}
                    />
                )}
            </View>

        </SafeAreaView>
    );
}
