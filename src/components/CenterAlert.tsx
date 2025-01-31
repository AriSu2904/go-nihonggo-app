import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface CenterAlertProps {
  cancelOnly: boolean;
  onCancel: () => void;
  onConfirm?: () => void;
  children: React.ReactNode;
}

const CenterAlert: React.FC<CenterAlertProps> = ({ cancelOnly, onCancel, onConfirm, children }) => {
  return (
    <View className="flex-1 justify-center items-center width-full">
      <View className="w-4/5 bg-white rounded-2xl p-6 elevation-xl">
        {/* Pesan */}
        {children}
        {/* Tombol */}
        <View className="flex-row justify-between mt-6">
          {/* Tombol No */}
          <TouchableOpacity
            onPress={onCancel}
            className={`flex-1 py-3 rounded-xl ${cancelOnly ? 'bg-red-400' : 'bg-green-400 mr-2'}`}
          >
            <Text className="text-center text-gray-800 font-medium">{cancelOnly ? 'Close' : 'No'}</Text>
          </TouchableOpacity>
          {/* Tombol Yes */}
          {!cancelOnly && (
            <TouchableOpacity
              onPress={onConfirm}
              className="flex-1 bg-red-400 py-3 rounded-xl ml-2"
            >
              <Text className="text-center font-medium">Yes</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default CenterAlert;