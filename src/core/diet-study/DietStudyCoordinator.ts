import { PatientStateType } from '@covid/core/patient/PatientState';
import { ICoreService } from '@covid/core/user/UserService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { AppCoordinator } from '@covid/features/AppCoordinator';
import NavigatorService from '@covid/NavigatorService';

type ScreenName = keyof ScreenParamList;
type ScreenFlow = {
  [key in ScreenName]: () => void;
};
type DietStudyParam = { dietStudyData: DietStudyData };

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

  get dietStudyParam(): DietStudyParam {
    return { dietStudyData: this.dietStudyData };
  }

  screenFlow: ScreenFlow = {
    DietStudyAboutYou: () => {
      NavigatorService.navigate('DietStudyYourLifestyle', this.dietStudyParam);
    },
    DietStudyYourLifestyle: () => {
      NavigatorService.navigate('DietStudyTypicalDiet', this.dietStudyParam);
    },
    DietStudyTypicalDiet: () => {
      NavigatorService.navigate('DietStudyThankYou', this.dietStudyParam);
    },
    DietStudyThankYou: () => {
      NavigatorService.navigate('WelcomeRepeat');
    },
  } as ScreenFlow;

  init = (appCoordinator: AppCoordinator, dietStudyData: DietStudyData, userService: ICoreService) => {
    this.appCoordinator = appCoordinator;
    this.dietStudyData = dietStudyData;
    this.userService = userService;
  };

  startIntro = () => {
    NavigatorService.navigate('DietStudyIntro', this.dietStudyParam);
  };

  startDietStudy = async () => {
    // Set default patient to first patient profile,
    // user can navigate here from drawer menu without picking a profile

    // TODO: Tell user they don't have a profile yet? (Is that a possbility?)
    try {
      const profile = await this.userService.myPatientProfile();
      const currentPatient = await this.userService.getPatientState(profile!.id);
      this.dietStudyData = { currentPatient };
      NavigatorService.navigate('DietStudyAboutYou', this.dietStudyParam);
    } catch (_) {}
  };

  gotoNextScreen = (screenName: ScreenName) => {
    if (this.screenFlow[screenName]) {
      this.screenFlow[screenName]();
    } else {
      console.error('[ROUTE] no next route found for:', screenName);
    }
  };

  async showProfiles() {
    return this.userService.getConfig().enableMultiplePatients && (await this.userService.hasMultipleProfiles());
  }
  async listPatients() {
    return this.userService.listPatients();
  }
}

const dietStudyCoordinator = new DietStudyCoordinator();
export default dietStudyCoordinator;
