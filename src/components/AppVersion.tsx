import Constants from "expo-constants";
import {MutedText} from "./Text";
import React from "react";


export const ApplicationVersion = () => (
  <MutedText style={{ textAlign: "center"}}>
      AppVersion: {Constants.nativeBuildVersion} - OTA: {Constants.manifest.revisionId}
  </MutedText>
);
