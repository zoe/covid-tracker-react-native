import Constants from "expo-constants";
import {RegularText} from "./Text";
import React from "react";
import {colors} from "../../theme";


export const ApplicationVersion = () => (
  <RegularText style={{color: colors.tertiary, textAlign: "center"}}>
      AppVersion: {Constants.nativeBuildVersion} - OTA: {Constants.manifest.revisionId}
  </RegularText>
);
