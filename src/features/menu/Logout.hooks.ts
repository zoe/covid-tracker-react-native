import { DrawerActions } from '@react-navigation/native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

import { IUserService } from '@covid/core/user/UserService';
import Analytics, { events } from '@covid/core/Analytics';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { DrawerMenuItem } from '@covid/features/menu/DrawerMenuItem';

export const useLogout = (navigation: DrawerNavigationHelpers) => {
  const userService = useInjection<IUserService>(Services.User);
  function logout() {
    Analytics.track(events.CLICK_DRAWER_MENU_ITEM, {
      name: DrawerMenuItem.LOGOUT,
    });
    userService.logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'CountrySelect' }],
    });
    navigation.dispatch(DrawerActions.closeDrawer());
  }

  return { logout };
};
