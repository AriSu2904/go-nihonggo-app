import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StudentResponse, useStudentProfile, useStudentProfilePicture } from '@/queries/studentsQuery';
import { ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [profileData, setProfileData] = useState<StudentResponse | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const { mutate: fetchProfile, isPending: loadingFetchProfile } = useStudentProfile({
    onSuccess: (data) => {
      const profile = data.data.data;
      setProfileData(profile);
      setImage(profile.profilePicture.url);
    },
    onError: (error) => {
      console.error('Error fetching data:', error);
    },
  });

  const { mutate: updatePict, isPending: loadingFetchProfilePicture } = useStudentProfilePicture({
    onSuccess: (data) => {
      const updatedData = data.data.data;
      setProfileData(updatedData);
    },
    onError: (error) => {
      console.error('Error updating profile picture:', error);
    },
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  // Loading state (only once, not duplicated)
  if (loadingFetchProfile || !profileData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text>Loading ...</Text>
      </View>
    );
  }

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
    <View style={styles.container}>
      {/* Profile Picture */}
      <View>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: image || 'default_image_uri' }}
            style={styles.profilePicture} />
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute', right: 0, bottom: 15 }}>
          <Icon name="camera-alt" size={22} onPress={pickImage} />
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <Text style={styles.name}>{profileData.fullName}</Text>
      <Text style={styles.studentId}>ID: {profileData.studentId}</Text>

      {/* Profile Details */}
      <View style={styles.detailContainer}>
        <DetailItem label="Campus" value={profileData.campus} />
        <DetailItem label="Gender" value={profileData.gender === 'L' ? 'Male' : 'Female'} />
        <DetailItem label="Join Date" value={new Date(profileData.joinDate).toLocaleDateString()} />
        <DetailItem label="Level" value={profileData.level} />
        <DetailItem label="Major" value={profileData.major} />
        <DetailItem label="Status" value={profileData.status} />
      </View>
    </View>
  );
}

// Detail Profile Component
function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}:</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  studentId: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  detailContainer: {
    width: '100%',
    marginTop: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#222',
  },
});
