import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext } from 'react';

export const AuthContext = createContext({
  isSignedIn: false,
  setIsSignedIn: (isSignedIn: boolean) => {},
});

export const storeData = async (value:any, key:string) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error(`Failed to store ${key} in AsyncStorage: ${e}`);
    }
};

export const getData = async (key:string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error(`Failed to get ${key} from AsyncStorage: ${e}`);
    }
};

export const removeValue = async (key:string) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch(e) {
      console.error(`Failed to remove ${key} from AsyncStorage: ${e}`);
    }
}
