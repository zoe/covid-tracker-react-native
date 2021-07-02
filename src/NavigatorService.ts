import Analytics from '@covid/core/Analytics';
import { ScreenName } from '@covid/core/Coordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { CommonActions, NavigationContainerRef, NavigationState, Route, StackActions } from '@react-navigation/native';

let navigation: NavigationContainerRef;
let currentRouteName = '';

function setContainer(navigationRef: NavigationContainerRef) {
  navigation = navigationRef;
}

function reset<RouteName extends ScreenName>(routeList: Omit<Route<RouteName>, 'key'>[], index?: number) {
  const value = index ?? 0;
  navigation?.dispatch(
    CommonActions.reset({
      index: value,
      routes: routeList,
    }),
  );
}

function navigate<RouteName extends ScreenName>(routeName: RouteName, params?: ScreenParamList[RouteName]) {
  navigation?.navigate(routeName, params);
}

function replace<RouteName extends ScreenName>(routeName: RouteName, params?: ScreenParamList[RouteName]) {
  navigation?.dispatch(StackActions.replace(routeName, params));
}

function goBack() {
  navigation?.goBack();
}

function handleStateChange() {
  const state = navigation?.getRootState();
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
    return getCurrentRouteName(route.state);
  }
  return route.name;
};

export default {
  goBack,
  handleStateChange,
  navigate,
  replace,
  reset,
  setContainer,
};
