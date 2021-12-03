import Analytics from '@covid/core/Analytics';
import { TScreenName } from '@covid/core/Coordinator';
import { TScreenParamList } from '@covid/routes/types';
import {
  CommonActions,
  DrawerActions,
  NavigationContainerRef,
  NavigationState,
  Route,
  StackActions,
} from '@react-navigation/native';

let navigation: NavigationContainerRef;
let currentRouteName = '';

function setContainer(navigationRef: NavigationContainerRef) {
  navigation = navigationRef;
}

function reset<RouteName extends TScreenName>(routeList: Omit<Route<RouteName>, 'key'>[], index?: number) {
  const value = index ?? 0;
  navigation?.dispatch(
    CommonActions.reset({
      index: value,
      routes: routeList,
    }),
  );
}

function navigate<RouteName extends TScreenName>(routeName: RouteName, params?: TScreenParamList[RouteName]) {
  navigation?.navigate(routeName, params);
}

function replace<RouteName extends TScreenName>(routeName: RouteName, params?: TScreenParamList[RouteName]) {
  navigation?.dispatch(StackActions.replace(routeName, params));
}

function goBack() {
  navigation?.goBack();
}

function push<RouteName extends TScreenName>(routeName: RouteName, params?: TScreenParamList[RouteName]) {
  navigation?.dispatch(StackActions.push(routeName, params));
}

function openDrawer() {
  navigation?.dispatch(DrawerActions.openDrawer());
}

function closeDrawer() {
  navigation?.dispatch(DrawerActions.closeDrawer());
}

function handleStateChange() {
  const rootState = navigation?.getRootState();

  if (rootState) {
    const previousRouteName = currentRouteName;
    const newRouteName = getCurrentRouteName(rootState);

    if (newRouteName) {
      if (previousRouteName !== newRouteName) {
        Analytics.trackScreenView(newRouteName);
      }
      currentRouteName = newRouteName;
    }
  }
}

const getCurrentRouteName = (navigationState: NavigationState): string | null => {
  if (!navigationState) {
    return null;
  }

  const route = navigationState.routes[navigationState.index];
  if (route.state) {
    // @ts-expect-error
    return getCurrentRouteName(route.state);
  }
  return route.name;
};

export default {
  closeDrawer,
  goBack,
  handleStateChange,
  navigate,
  openDrawer,
  push,
  replace,
  reset,
  setContainer,
};
