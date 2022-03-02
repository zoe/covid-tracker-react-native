import Analytics, { events } from '@covid/core/Analytics';
import { appActions } from '@covid/core/state/app/slice';
import { resetDiseasePreferences, resetFeedback } from '@covid/core/state/reconsent';
import { reset as resetUser } from '@covid/core/state/user';
import { userService } from '@covid/core/user/UserService';
import NavigatorService from '@covid/NavigatorService';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { NavigationContainerRef } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

export function useLogout(navigation: DrawerNavigationHelpers | NavigationContainerRef<ReactNavigation.RootParamList>) {
  const dispatch = useDispatch();

  return function logout() {
    Analytics.track(events.LOGOUT);
    userService.logout();
    // @todo: Reset more parts of the redux state
    dispatch(appActions.reset());
    dispatch(resetUser());
    dispatch(resetDiseasePreferences());
    dispatch(resetFeedback());
    // @todo: Remove this dependency
    navigation.reset({
      index: 0,
      routes: [{ name: 'CountrySelect' }],
    });
    NavigatorService.closeDrawer();
  };
}
