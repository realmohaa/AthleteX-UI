import * as SecureStore from 'expo-secure-store';

export const store = async (key:string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.log('Could not save token', error);
  }
};

export const retrieve = async (key: string) => {
    try {
      const value = await SecureStore.getItemAsync(key);
      return value
    } catch (error) {
      console.log('Could not load token', error);
    }
  };