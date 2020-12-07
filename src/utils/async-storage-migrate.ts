import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

const AsyncLocalStorageFolderOptions = {
  fromList: [
    `${FileSystem.documentDirectory}RCTAsyncLocalStorage`,
    `${FileSystem.documentDirectory}ExponentExperienceData/%2540julien.lavigne%252Fcovid-zoe/RCTAsyncLocalStorage`,
  ],
  to: `${FileSystem.documentDirectory}RCTAsyncLocalStorage_V1`,
};

const Manifest = {
  from: (path: string) => `${path}/manifest.json`,
};

type ManifestSearchResult = {
  found: boolean;
  path?: string;
};

const firstInList = async (fromList: string[]): Promise<ManifestSearchResult> => {
  let i = 0;
  let found = false;
  let path = undefined;

  while (i < fromList.length - 1) {
    try {
      const content = await FileSystem.readAsStringAsync(Manifest.from(fromList[i]));
      found = !!content;
      path = Manifest.from(fromList[i]);
    } catch (error) {
      //
    } finally {
      i++;
    }
    break;
  }

  return { found, path };
};

const shouldMigrate = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    if (!FileSystem.documentDirectory) {
      return false;
    }
    const { found } = await firstInList(AsyncLocalStorageFolderOptions.fromList);
    return found;
  }
  if (Platform.OS === 'android') {
    return false;
  } else {
    return false;
  }
};

const migrateIOSAsyncStorage = async () => {
  try {
    const info = await FileSystem.getInfoAsync(AsyncLocalStorageFolderOptions.to);

    if (!info.exists) {
      await FileSystem.makeDirectoryAsync(AsyncLocalStorageFolderOptions.to);
    }
    const { path: fromPath } = await firstInList(AsyncLocalStorageFolderOptions.fromList);

    if (!fromPath) {
      // Missing file path
      return;
    }

    const content = await FileSystem.readAsStringAsync(fromPath!);
    await FileSystem.writeAsStringAsync(Manifest.from(AsyncLocalStorageFolderOptions.to), content);
    await FileSystem.deleteAsync(fromPath);
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
