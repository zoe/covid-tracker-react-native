import { NavigationContainerRef, CommonActions, StackActions, Route, NavigationState } from '@react-navigation/native';

import { ScreenParamList } from '@covid/features/ScreenParamList';
import Analytics from '@covid/core/Analytics';

let navigation: NavigationContainerRef;
let currentRouteName = '';

function setContainer(navigationRef: NavigationContainerRef) {
  navigation = navigationRef;
}

function reset<RouteName extends keyof ScreenParamList>(routeList: Omit<Route<RouteName>, 'key'>[]) {
  navigation!.dispatch(
    CommonActions.reset({
      index: 0,
      routes: routeList,
    })
  );
}

function navigate<RouteName extends keyof ScreenParamList>(routeName: RouteName, params?: ScreenParamList[RouteName]) {
  navigation!.navigate(routeName, params);
}

function replace<RouteName extends keyof ScreenParamList>(routeName: RouteName, params?: ScreenParamList[RouteName]) {
  navigation!.dispatch(StackActions.replace(routeName, params));
}

function goBack() {
  navigation!.goBack();
}

function handleStateChange() {
  const state = navigation!.getRootState();
  if (!state) return;

  const previousRouteName = currentRouteName;
  const newRouteName = getCurrentRouteName(state);

  if (newRouteName) {
    if (previousRouteName !== newRouteName) {
      Analytics.trackScreenView(newRouteName);
    }
    currentRouteName = newRouteName;
  }
}

const getCurrentRouteName = (navigationState: NavigationState): string | null => {
  if (!navigationState) return null;

  const route = navigationState.routes[navigationState.index];
  if (route.state) {
    // Nested navigators
    // @ts-ignore
    return getCurrentRouteName(route.state);
  }
  return route.name;
};

export default {
  setContainer,
  navigate,
  reset,
  replace,
  goBack,
  handleStateChange,
};
