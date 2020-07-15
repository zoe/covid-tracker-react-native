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

function popTo<RouteName extends keyof ScreenParamList>(routeName: RouteName, inclusive: boolean = false) {
  navigation!.dispatch((state) => {
    const newRoutes = state.routes;

    while (newRoutes[newRoutes.length - 1].name !== routeName) {
      newRoutes.pop();
    }

    if (inclusive) {
      newRoutes.pop();
    }

    return CommonActions.reset({
      index: 0,
      routes: newRoutes,
    });
  });
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
  popTo,
};
