import { StackNavigationProp } from '@react-navigation/stack';

import { PatientStateType } from '@covid/core/patient/PatientState';
import UserService, { ICoreService } from '@covid/core/user/UserService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { AppCoordinator } from '@covid/features/AppCoordinator';

type ScreenName = keyof ScreenParamList;
type ScreenFlow = {
  [key in ScreenName]: () => void;
};

export type NavigationType = StackNavigationProp<ScreenParamList, keyof ScreenParamList>;

export type DietStudyData = {
  recentDietStudyId?: string;
  febDietStudyId?: string;
  currentPatient: PatientStateType;
};

export class DietStudyCoordinator {
  appCoordinator: AppCoordinator;
  navigation: NavigationType;
  userService: ICoreService;
  dietStudyData: DietStudyData;

  screenFlow: ScreenFlow = {
    DietStudyAboutYou: () => {
      this.navigation.navigate('DietStudyYourLifestyle', { dietStudyData: this.dietStudyData });
    },
    DietStudyYourLifestyle: () => {
      this.navigation.navigate('DietStudyTypicalDiet', { dietStudyData: this.dietStudyData });
    },
    DietStudyTypicalDiet: () => {
      this.navigation.navigate('DietStudyThankYou', { dietStudyData: this.dietStudyData });
    },
    DietStudyThankYou: () => {
      this.appCoordinator.startAssessmentFlow(this.dietStudyData.currentPatient);
    },
  } as ScreenFlow;

  init = (
    appCoordinator: AppCoordinator,
    navigation: NavigationType,
    dietStudyData: DietStudyData,
    userService: ICoreService
  ) => {
    this.appCoordinator = appCoordinator;
    this.navigation = navigation;
    this.dietStudyData = dietStudyData;
    this.userService = userService;
  };

  startDietStudy = () => {
    this.navigation.navigate('DietStudyAboutYou', { dietStudyData: this.dietStudyData });
  };

  gotoNextScreen = (screenName: ScreenName) => {
    if (this.screenFlow[screenName]) {
      this.screenFlow[screenName]();
    } else {
      console.error('[ROUTE] no next route found for:', screenName);
    }
  };
}

const dietStudyCoordinator = new DietStudyCoordinator();
export default dietStudyCoordinator;
