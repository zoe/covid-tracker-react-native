import { NavigationContainerRef, CommonActions, StackActions, Route } from '@react-navigation/native';

import { ScreenParamList } from '@covid/features/ScreenParamList';

let navigation: NavigationContainerRef;

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

export default {
  setContainer,
  navigate,
  reset,
  replace,
  goBack,
};
