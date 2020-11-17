import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

const AsyncLocalStorageFolderOptions = {
  from: `${FileSystem.documentDirectory}ExponentExperienceData/%2540julien.lavigne%252Fcovid-zoe/RCTAsyncLocalStorage`,
  to: `${FileSystem.documentDirectory}RCTAsyncLocalStorage_V1`,
};

const Manifest = {
  from: (path: string) => `${path}/manifest.json`,
};

const shouldMigrate = async (): Promise<boolean> => {
  if (!FileSystem.documentDirectory) {
    return false;
  }
  try {
    const content = await FileSystem.readAsStringAsync(Manifest.from(AsyncLocalStorageFolderOptions.from));
    return !!content;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const migrateIOSAsyncStorage = async () => {
  try {
    console.log('migrate ios storage');
    const info = await FileSystem.getInfoAsync(AsyncLocalStorageFolderOptions.to);
    console.log(info);
    if (!info.exists) {
      await FileSystem.makeDirectoryAsync(AsyncLocalStorageFolderOptions.to);
    }
    const content = await FileSystem.readAsStringAsync(Manifest.from(AsyncLocalStorageFolderOptions.from));
    await FileSystem.writeAsStringAsync(Manifest.from(AsyncLocalStorageFolderOptions.to), content);
    await FileSystem.deleteAsync(Manifest.from(AsyncLocalStorageFolderOptions.from));
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

export const migrateIfNeeded = async (): Promise<void> => {
  const should = await shouldMigrate();
  if (!should) {
    return;
  }
  if (Platform.OS === 'ios') {
    await migrateIOSAsyncStorage();
  }
};
