import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from "react-native";
import {
  StudentResponse,
  useStudentProfile,
  useStudentProfilePicture,
} from "@/queries/studentsQuery";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { backgroundScreen } from "@/utils/globalStyle";
import BackgroundImage from "@/components/BackgroundImage";
import { height, width } from "@/utils/sizeContext";
import CustomText from "@/components/TabText";
import { HistoryUser, useHistoryUserQuiz } from "@/queries/historyQuery";
import { mockData } from "@/lib/dev/mock-data";
import { generateQuizName } from "@/utils/materialUtil";
import { useSession } from "@/contexts/auth.context";

export default function ProfileScreen() {
  const [profileData, setProfileData] = useState<StudentResponse | null>(null);
  const [histories, setHistories] = useState<HistoryUser[]>([]);
  const [image, setImage] = useState<any | null>(null);

  const { signOut } = useSession();

  const { mutate: fetchProfile, isPending: loadingFetchProfile } = useStudentProfile({
    onSuccess: ({ data }) => {
      const profile = data.data;
      let profilePictureUrl = profile.profilePicture.url;
      if (profilePictureUrl.startsWith("https://avatar.iran.liara.run")) {
        const gender = profile.gender;
        if (gender === "L") {
          profilePictureUrl = require("../../../assets/images/def_boy_img.png");
        } else {
          profilePictureUrl = require("../../../assets/images/def_girl_img.png");
        }
      }

      console.log("Fetched Profile:", profile);

      setProfileData(profile);
      setImage(profilePictureUrl);
    },
    onError: (error) => {
      console.error("Error fetching data:", error);
    },
  });

  const { mutate: updatePict, isPending: loadingFetchProfilePicture } = useStudentProfilePicture({
    onSuccess: (data) => {
      const updatedData = data.data.data;
      setProfileData(updatedData);
    },
    onError: (error) => {
      console.error("Error updating profile picture:", error);
    },
  });

  const { mutate: fetchHistory, isPending: loadingFetchHistory } = useHistoryUserQuiz({
    onSuccess: ({ data }) => {
      const histories = data.data;
      console.log("Fetched History:", histories);
      setHistories(histories);
    },
    onError: (error) => {
      console.error("Error fetching history:", error);
    },
  });

  useEffect(() => {
    fetchProfile();
    fetchHistory("ALL");
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const selectedImage = result.assets[0].uri;
        setImage(selectedImage);
        updatePict(selectedImage);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundScreen }}>
      {/* Background Image */}
      <View>
        <BackgroundImage />
      </View>

      {/* Profile Info */}
      <ScrollView style={{ marginTop: height * 0.1, paddingHorizontal: width * 0.04, zIndex: 50 }}>
        <View style={{ alignItems: "center" }}>
          <View>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={typeof image === "string" ? { uri: image } : image}
                className="rounded-full border-4 border-[#FAC577]"
                style={{
                  width: width * 0.4,
                  height: height * 0.2,
                  borderWidth: width * 0.015,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="absolute rounded-full bg-black"
              style={{
                bottom: width * -0.01,
                right: width * 0.28,
              }}
              onPress={pickImage}
            >
              <Icon name="camera" size={height * 0.04} color="white" />
            </TouchableOpacity>
          </View>
          <View
            className="items-center bg-[#88B8CF]"
            style={{
              marginTop: height * 0.05,
              width: "100%",
              borderRadius: height * 0.03,
              paddingVertical: height * 0.01,
            }}
          >
            <CustomText fontSize={24} fontFamily="Poppins-SemiBold" fontColor="black">
              {profileData?.fullName}
            </CustomText>
            <View style={{ marginTop: height * -0.02 }}>
              <CustomText fontSize={16} fontFamily="Poppins-Medium" fontColor="black">
                {profileData?.studentId}
              </CustomText>
            </View>
          </View>
        </View>
        <View
          style={{ marginTop: height * 0.025, marginBottom: height * 0.015, alignItems: "center" }}
        >
          <CustomText fontSize={18} fontFamily="Poppins-SemiBold">
            User Info
          </CustomText>
        </View>
        <View className="flex-row flex-wrap justify-between">
          <View
            className="bg-[#AAC0E5]"
            style={{
              width: width * 0.45,
              marginRight: width * 0.02,
              height: height * 0.06,
              borderRadius: height * 0.025,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CustomText fontSize={16} fontFamily="Poppins-SemiBold" fontColor="black">
              {profileData?.level}
            </CustomText>
          </View>
          <View
            className="bg-[#AFD393]"
            style={{
              width: width * 0.45,
              height: height * 0.06,
              borderRadius: height * 0.025,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CustomText fontSize={16} fontFamily="Poppins-SemiBold" fontColor="black">
              {profileData?.major}
            </CustomText>
          </View>
          <View
            className="bg-[#FAC577]"
            style={{
              width: "100%",
              height: height * 0.06,
              borderRadius: height * 0.025,
              alignItems: "center",
              marginTop: height * 0.02,
              justifyContent: "center",
            }}
          >
            <CustomText fontSize={16} fontFamily="Poppins-SemiBold" fontColor="black">
              {profileData?.campus}
            </CustomText>
          </View>
          <TouchableOpacity
            className="bg-red-300 w-full"
            style={{
              width: "100%",
              height: height * 0.06,
              borderRadius: height * 0.025,
              alignItems: "center",
              marginTop: height * 0.02,
              justifyContent: "center",
            }}
            onPress={signOut}
          >
            <CustomText fontSize={16} fontFamily="Poppins-SemiBold" fontColor="black">
              Logout
            </CustomText>
          </TouchableOpacity>
          <View
            style={{
              width: "100%",
              borderRadius: height * 0.025,
              marginTop: height * 0.02,
              marginBottom: height * 0.02,
            }}
          >
            <View style={{ marginTop: height * 0.015, alignItems: "center" }}>
              <CustomText fontSize={16} fontFamily="Poppins-SemiBold">
                Recent Histories
              </CustomText>
            </View>
            <View style={{ marginBottom: height * 0.1 }}>
              {histories.map((item, index) => (
                <View
                  style={{
                    paddingHorizontal: height * 0.02,
                    paddingVertical: height * 0.015,
                    marginTop: height * 0.01,
                    backgroundColor: "black",
                    borderRadius: height * 0.02,
                  }}
                  key={index}
                >
                  <CustomText fontSize={16} fontFamily="Poppins-SemiBold">
                    {item.materialParent} - {generateQuizName(item.quizLevel)}
                  </CustomText>
                  <View className="flex-row flex-wrap justify-evenly">
                    <CustomText fontSize={16} fontFamily="Poppins-Medium">
                      • Total Attempt: {item.totalAttempt}
                    </CustomText>
                    <CustomText fontSize={16} fontFamily="Poppins-Medium">
                      • Highest Score: {Math.max(...item.scores)}
                    </CustomText>
                  </View>
                  <View
                    style={{
                      marginTop: height * -0.01,
                      paddingHorizontal: height * 0.023,
                      alignItems: "flex-end",
                    }}
                  >
                    <CustomText fontSize={16} fontFamily="Poppins-Regular">
                      Scores: {item.scores.join(",")}
                    </CustomText>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
