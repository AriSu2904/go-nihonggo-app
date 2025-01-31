import CenterAlert from "@/components/CenterAlert";
import CustomText from "@/components/TabText";
import { useMaterialContent } from "@/queries/materialsQuery";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, TouchableOpacity, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function MaterialScreen() {
    const route = useRoute();
    const { title } = route.params as { title: string };
    const [contents, setContents] = useState<any[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [material, setMaterial] = useState<string>("");
    const navigation = useNavigation();

    const { mutate: fetchContent, isPending } = useMaterialContent({
        onSuccess: ({ data }) => {
            console.log("Data fetched:", data);
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
        <SafeAreaView className="flex-1 bg-[#F8F9FA]">
            { /* back button */}
            <TouchableOpacity 
                onPress={() => navigation.goBack()} 
                className="absolute top-6 left-6 p-3 rounded-full"
                style={{ backgroundColor: "#9C4A4A" }}
            >
                <Icon name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            {/* Alert */}
            {showAlert && (
                <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center z-50 bg-black/50">
                    <CenterAlert cancelOnly={true} onCancel={() => setShowAlert(false)} >
                        <CustomText fontSize={14} focused={true} fontFamily="Poppins-Regular">
                            <View className="justify-center items-center">
                                <CustomText fontSize={16} focused={false} fontFamily="Poppins-SemiBold" style={{ textAlign: 'center' }}>
                                    {material === "Dakuten" ? "Dakuten (゛)" : "Handakuten (゜)"}
                                </CustomText>
                                <CustomText fontSize={14} focused={true} fontFamily="Poppins-Regular" style={{ textAlign: 'center' }}>
                                    is a symbol that is used to change the pronunciation of a character. It is placed at the upper right corner of the character.
                                </CustomText>
                                <Image source={material === "Dakuten" ? require("../../../assets/images/dakuten.png") : require("../../../assets/images/handakuten.png")}
                                    resizeMode="stretch"
                                    className="w-40 h-36 rounded-3xl my-2" />
                            </View>
                        </CustomText>
                    </CenterAlert>
                </View>
            )}

            {/* Judul */}

            <View className="mt-12 p-4 justify-center items-center">
                <CustomText fontSize={24} focused={true} fontFamily="Poppins-SemiBold">
                    {title}
                </CustomText>
                <CustomText fontSize={20} focused={true} fontFamily="Poppins-Regular">
                    Choose a section
                </CustomText>
            </View>

            <FlatList
                data={contents}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-evenly" }}
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity
                            className="rounded-2xl"
                            onPress={() => alert("Coming soon!")}
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
                                <CustomText fontSize={16} focused={true} fontFamily="Poppins-SemiBold">
                                    {item.name}
                                </CustomText>

                                {/* Tampilkan ikon hanya jika item.name adalah "Dakuten" atau "Handakuten" */}
                                {(item.name === "Dakuten" || item.name === "Handakuten") && (
                                    <TouchableOpacity className="ml-1"
                                        onPress={() => {
                                            setShowAlert(true);
                                            setMaterial(item.name);
                                        }}
                                    >
                                        <Icon name="help-outline" color="black" size={15} />
                                    </TouchableOpacity>
                                )}
                            </View>

                            <CustomText fontSize={13} focused={true} fontFamily="Poppins-Regular" style={{ textAlign: "center" }}>
                                {item.description}
                            </CustomText>
                        </View>
                    </View>
                )}
            />

        </SafeAreaView>
    );
}
