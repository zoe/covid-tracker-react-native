import Analytics, { events } from '@covid/core/Analytics';
import { reset } from '@covid/core/state/user';
import { userService } from '@covid/core/user/UserService';
import { DrawerMenuItem } from '@covid/features/menu/DrawerMenuItem';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { DrawerActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

export const useLogout = (navigation: DrawerNavigationHelpers) => {
  const dispatch = useDispatch();
  function logout() {
    Analytics.track(events.CLICK_DRAWER_MENU_ITEM, {
      name: DrawerMenuItem.LOGOUT,
    });
    userService.logout();
    dispatch(reset());
    navigation.reset({
      index: 0,
      routes: [{ name: 'CountrySelect' }],
    });
    navigation.dispatch(DrawerActions.closeDrawer());
  }

  return { logout };
};
