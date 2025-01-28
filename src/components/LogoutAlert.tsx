import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

interface CenterAlertProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

const CenterAlert: React.FC<CenterAlertProps> = ({ visible, onConfirm, onCancel, children }) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-4/5 bg-white rounded-2xl p-6">
          {/* Pesan */}
          {children}
          {/* Tombol */}
          <View className="flex-row justify-between mt-6">
            {/* Tombol No */}
            <TouchableOpacity
              onPress={onCancel}
              className="flex-1 bg-green-400 py-3 rounded-xl mr-2"
            >
              <Text className="text-center text-gray-800 font-medium">No</Text>
            </TouchableOpacity>
            {/* Tombol Yes */}
            <TouchableOpacity
              onPress={onConfirm}
              className="flex-1 bg-red-400 py-3 rounded-xl ml-2"
            >
              <Text className="text-center font-medium">Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CenterAlert;
