import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IStorageService {
  setObject<T>(key: string, obj: T): Promise<void>;
  getObject<T>(key: string): Promise<T | null>;
}

class LocalStorageService implements IStorageService {
  async setObject<T>(key: string, obj: T): Promise<void> {
    try {
      return await AsyncStorage.setItem(key, JSON.stringify(obj));
    } catch (error) {
      return undefined;
    }
  }

  async getObject<T>(key: string): Promise<T | null> {
    try {
      const val = await AsyncStorage.getItem(key);
      return val ? (JSON.parse(val) as T) : null;
    } catch (error) {
      return null;
    }
  }
}

export default LocalStorageService;
