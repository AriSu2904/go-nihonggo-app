import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View, TouchableOpacity, Text, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import BackButton from '@/components/BackButton';
import RoundedBox from '@/components/RoundedBox';
import Icon from "react-native-vector-icons/MaterialIcons";
import { LetterResponse, useListLetters } from '@/queries/lettersQuery';
import CustomText from '@/components/TabText';
import { Audio } from 'expo-av';
import { backgroundScreen, fontColors, RANDOM_LIGHT_COLOR } from '@/utils/globalStyle';
import BackgroundImage from '@/components/BackgroundImage';


interface LetterDetailProps {
    children: React.ReactNode;
    imageDetailUri: string;
}

const LetterDetail: React.FC<LetterDetailProps> = ({ children, imageDetailUri }) => {
    return (
        <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center z-50 bg-black/50">
            <View className="bg-white w-9/12 h-3/6 rounded-2xl p-4">
                <View className="flex-1 items-center justify-center">
                    <Image source={{ uri: imageDetailUri }} style={{ resizeMode: 'contain', width: '100%', height: '100%' }} />
                </View>
                {children}
            </View>
        </View>
    );
};

const LetterScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { materialName, level } = route.params as { materialName: string, level: number };
    const [letters, setLetters] = useState<LetterResponse[]>([]);
    const [showDetail, setShowDetail] = useState(false);
    const [imageDetail, setImageDetail] = useState<{imageUrl: string, audioUri: string}>();
    const [sound, setSound] = useState<any>(null);
    const [backButtonColor] = useState(RANDOM_LIGHT_COLOR());

    const playAudio = async () => {
        if(imageDetail?.imageUrl) {
            const { sound } = await Audio.Sound.createAsync({
                uri: imageDetail.audioUri,
            });

            setSound(sound);

            await sound.playAsync();
        }
    };

    const { mutate: fetchLetters } = useListLetters({
        onSuccess: ({ data }) => {
            console.log("Data fetched:", data);
            setLetters(data.data);
        },
        onError: (error) => {
            console.error("Error fetching data:", error.message);
        },
    });

    useEffect(() => {
        fetchLetters({ materialName, level });
    }, []);

    const groupedData = () => {
        let result = [];
        let tempRow: any = [];
        let currentColumns = 5;

        letters.forEach((item, index) => {
            const numColumns = item.order >= 40 ? 3 : 5;

            if (tempRow.length === currentColumns || numColumns !== currentColumns) {
                result.push(tempRow);
                tempRow = [];
                currentColumns = numColumns;
            }

            tempRow.push(item);
        });

        if (tempRow.length > 0) {
            result.push(tempRow);
        }

        return result;
    };

    return (
        <SafeAreaView className={`flex-1 bg-[${backgroundScreen}]`}>
            <View>
                <BackgroundImage />
            </View>

            {/* Back Button */}
                <BackButton onPress={() => navigation.goBack()} backgroundColor={backButtonColor} iconColor='#000000' />

            {/* Alert */}
            {showDetail && imageDetail && (
                <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center z-50 bg-black/50">
                    <LetterDetail imageDetailUri={imageDetail.imageUrl}>
                        <View className='flex-row justify-evenly items-center'>
                            <TouchableOpacity onPress={() => setShowDetail(false)}
                            className="flex-1 bg-[#f58383] rounded-xl py-2"
                                style={{ maxWidth: '60%'}}
                            >
                                <CustomText fontSize={15} fontColor={fontColors.black} fontFamily="Poppins-Medium" style={{ textAlign: 'center' }}>
                                    Close
                                </CustomText>
                            </TouchableOpacity>
                            <TouchableOpacity className='bg-[#19eea7] rounded-xl p-2'
                                onPress={playAudio}
                            >
                                <Icon name="multitrack-audio" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </LetterDetail>
                </View>
            )}

            {/* Judul */}

            {/* FlatList dengan pengelompokan manual */}
            <FlatList
                data={groupedData()}
                keyExtractor={(item, index) => `row-${index}`}
                contentContainerStyle={{ paddingBottom: 80 }}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 10, marginTop: 10 }}>
                        {item.map((letter: LetterResponse, index: React.Key | null | undefined) => (
                            <RoundedBox
                                key={index}
                                imgUri={letter.secondImgUri}
                                onPress={() => {
                                    console.log("Pressed:", letter.secondImgUri);
                                    setShowDetail(true);
                                    setImageDetail({ imageUrl: letter.secondImgDetailUri, audioUri: letter.audioUri });
                                }}
                            />
                        ))}
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default LetterScreen;
