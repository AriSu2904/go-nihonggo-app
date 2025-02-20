import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setToLocalStorage<T>(key: string, value: T | null) {
    try {
        console.log("Saving data to local storage:", key);

      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving data to local storage:", error);
    }
  }
  
  export async function getFromLocalStorage<T>(key: string){
    try {
      const value = await AsyncStorage.getItem(key);
  
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Error getting data from local storage:", error);
    }
  }
  