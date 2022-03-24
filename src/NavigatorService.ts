import Analytics from '@covid/core/Analytics';
import analytics from '@react-native-firebase/analytics';
import { TScreenName } from '@covid/core/Coordinator';
import { TScreenParamList } from '@covid/routes/types';
import {
  CommonActions,
  DrawerActions,
  NavigationContainerRef,
  NavigationState,
  Route,
  StackActions,
  TabActions,
} from '@react-navigation/native';

let navigation: NavigationContainerRef<ReactNavigation.RootParamList> | undefined;
let currentRouteName = '';

function jumpTo(routeName: TScreenName) {
  navigation?.dispatch(TabActions.jumpTo(routeName));
}

function setup(navigationContainerRef: NavigationContainerRef<ReactNavigation.RootParamList>) {
  navigation = navigationContainerRef;
}

function reset(routeList: Omit<Route<TScreenName>, 'key'>[], index?: number) {
  const value = index ?? 0;
  navigation?.dispatch(
    CommonActions.reset({
      index: value,
      routes: routeList,
    }),
  );
}

function navigate(routeName: TScreenName, params?: TScreenParamList[TScreenName]) {
  navigation?.navigate(routeName, params);
}

function replace(routeName: TScreenName, params?: TScreenParamList[TScreenName]) {
  navigation?.dispatch(StackActions.replace(routeName, params));
}

function goBack() {
  navigation?.goBack();
}

function push(routeName: TScreenName, params?: TScreenParamList[TScreenName]) {
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
        analytics()
          .logScreenView({
            screen_class: currentRouteName,
            screen_name: currentRouteName,
          })
          .then(() => {})
          .catch((e) => {
            console.log(e);
          });
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
  jumpTo,
  navigate,
  openDrawer,
  push,
  replace,
  reset,
  setup,
};
