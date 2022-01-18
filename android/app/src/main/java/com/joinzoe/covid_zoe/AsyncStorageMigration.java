package com.joinzoe.covid_zoe;

import java.io.File;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import com.facebook.react.modules.storage.ReactDatabaseSupplier;

import org.apache.commons.io.FileUtils;

public class AsyncStorageMigration {
    static final String LOG_TAG = "expo-storage-migration";

    private static Context appContext;
    private static String expoDatabaseName;
    private static final String experienceId = "%40julien.lavigne%2Fcovid-zoe";

    public static void migrate(Context context) {
        appContext = context;
        expoDatabaseName = "RKStorage-scoped-experience-" + experienceId;

        boolean expoDatabaseExists = checkExpoDatabase();
        if (!expoDatabaseExists) {
            Log.v(LOG_TAG, "No Expo AsyncStorage was found. Exiting migration...");
            return;
        }

        if(!importDatabase()){
            Log.v(LOG_TAG, "Could not import old data. Exiting migration...");
            return;
        }

        if (!deleteOldDatabase()) {
            Log.v(LOG_TAG, "Could not delete old database. Exiting migration...");
            return;
        }

        Log.v(LOG_TAG, "Migration done!");
    }


    private static boolean checkExpoDatabase() {
        File dbFile = appContext.getDatabasePath(expoDatabaseName);
        return dbFile.exists();
    }

    private static boolean importDatabase() {
        try {
            File expoDatabaseFile = appContext.getDatabasePath(expoDatabaseName);

            SQLiteDatabase RNDatabase = ReactDatabaseSupplier.getInstance(appContext).get();
            String RNDatabasePath = RNDatabase.getPath();

            File RNDatabaseFile = new File(RNDatabasePath);

            if(expoDatabaseFile.exists() && RNDatabaseFile.exists()){
                FileUtils.copyFile(expoDatabaseFile, RNDatabaseFile);
                return true;
            }
            return false;
        } catch(Exception e){
            Log.e(LOG_TAG, "Import database error: " + e.getMessage());
            return false;
        }
    }

    private static Boolean deleteOldDatabase() {
        return appContext.deleteDatabase(expoDatabaseName);
    }
}
