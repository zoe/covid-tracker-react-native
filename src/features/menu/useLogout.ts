import Analytics, { events } from '@covid/core/Analytics';
import { resetDiseasePreferences, resetFeedback } from '@covid/core/state/reconsent';
import { reset as resetUser } from '@covid/core/state/user';
import { userService } from '@covid/core/user/UserService';
import NavigatorService from '@covid/NavigatorService';
import { appActions } from '@health-study/redux/app';
import { store } from '@health-study/redux/store';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { NavigationContainerRef } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

export function useLogout(navigation: DrawerNavigationHelpers | NavigationContainerRef<ReactNavigation.RootParamList>) {
  const dispatch = useDispatch();

  return function logout() {
    Analytics.track(events.LOGOUT);
    userService.logout();
    // @todo: Reset more parts of the redux state
    store.dispatch(appActions.reset());
    dispatch(resetUser());
    dispatch(resetDiseasePreferences());
    dispatch(resetFeedback());
    // @todo: Remove this dependency
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
    NavigatorService.closeDrawer();
  };
}
