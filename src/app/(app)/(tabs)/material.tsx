import CustomText from "@/components/TabText";
import { useMaterialContent } from "@/queries/materialsQuery";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, TouchableOpacity, Image } from "react-native";

export default function MaterialScreen() {
    const route = useRoute();
    const { title } = route.params as { title: string };
    const [contents, setContents] = useState<any[]>([]);

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
        <SafeAreaView className="flex-1 bg-slate-700">
            <View className="mt-20 p-4">
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
                numColumns={2} // Display 2 items per row
                columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 16 }} // Adjust spacing
                renderItem={({ item }) => (
                    <View className="w-1/2 p-2">
                        <TouchableOpacity
                            className="bg-white h-44 rounded-2xl justify-center items-start"
                            onPress={() => console.log("Pressed", item.name)}
                        >
                            <Image source={require("../../../assets/images/test.jpg")} 
                            className="w-48 h-44" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}
