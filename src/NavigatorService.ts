import { NavigationContainerRef, CommonActions, StackActions, Route } from '@react-navigation/native';

let navigation: NavigationContainerRef;

function setContainer(navigationRef: NavigationContainerRef) {
  navigation = navigationRef;
}

function reset(routeList: Omit<Route<string>, 'key'>[]) {
  navigation!.dispatch(
    CommonActions.reset({
      index: 0,
      routes: routeList,
    })
  );
}

function navigate(routeName: string, params?: object) {
  navigation!.navigate(routeName, params);
}

function replace(routeName: string, params?: object) {
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
