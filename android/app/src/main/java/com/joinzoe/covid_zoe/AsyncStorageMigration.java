package com.joinzoe.covid_zoe;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.channels.FileChannel;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import com.facebook.react.modules.storage.ReactDatabaseSupplier;

public class AsyncStorageMigration {
    static final String LOG_TAG = "expo_storage_migration";

    private static Context mContext;
    private static String expoDatabaseName;

    public static void migrate(Context context) {
        mContext = context;

        expoDatabaseName = getExpoDatabaseName();
        if (expoDatabaseName.length() == 0)
            return;

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

    private static String getExpoDatabaseName() {
        String databaseName = "";
        String experienceId = "@julien.lavigne/covid-zoe";

        try {
            String experienceIdEncoded = URLEncoder.encode(experienceId, "UTF-8");
            databaseName = "RKStorage-scoped-experience-" + experienceIdEncoded;
        } catch (Exception e) {
            Log.e(LOG_TAG, "Could not get Expo database name");
        }

        return databaseName;
    }

    private static boolean checkExpoDatabase() {
        File dbFile = mContext.getDatabasePath(expoDatabaseName);
        return dbFile.exists();
    }

    private static boolean importDatabase() {
        try {
            File expoDatabaseFile = mContext.getDatabasePath(expoDatabaseName);

            SQLiteDatabase RNDatabase = ReactDatabaseSupplier.getInstance(mContext).get();
            String RNDatabasePath = RNDatabase.getPath();

            File RNDatabaseFile = new File(RNDatabasePath);

            if(expoDatabaseFile.exists() && RNDatabaseFile.exists()){
                copyFile(new FileInputStream(expoDatabaseFile), new FileOutputStream(RNDatabaseFile));
                return true;
            }
            return false;
        } catch(Exception e){
            Log.e(LOG_TAG, "Import database error: " + e.getMessage());
            return false;
        }
    }

    private static void copyFile(FileInputStream fromFile, FileOutputStream toFile) throws IOException {
        FileChannel fromChannel = null;
        FileChannel toChannel = null;
        try {
            fromChannel = fromFile.getChannel();
            toChannel = toFile.getChannel();
            fromChannel.transferTo(0, fromChannel.size(), toChannel);
        } finally {
            try {
                if (fromChannel != null) {
                    fromChannel.close();
                }
            } finally {
                if (toChannel != null) {
                    toChannel.close();
                }
            }
        }
    }

    private static Boolean deleteOldDatabase() {
        return mContext.deleteDatabase(expoDatabaseName);
    }
}