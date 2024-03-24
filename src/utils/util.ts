import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value:any, key:string) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log(e)
    }
};

export const getData = async (key:string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e)
    }
};

export const removeValue = async (key:string) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch(e) {
      console.log(e)
    }
}
