import { closeIcon } from '@assets';
import { EditProfilesIcon } from '@assets/icons/navigation/EditProfilesIcon';
import { HeartIcon } from '@assets/icons/navigation/HeartIcon';
import { MediaIcon } from '@assets/icons/navigation/MediaIcon';
import { ShareIcon } from '@assets/icons/navigation/ShareIcon';
import { Text } from '@covid/components';
import { share } from '@covid/components/cards/BaseShareApp';
import { Screen } from '@covid/components/Screen';
import { CaptionText } from '@covid/components/Text';
import { isGBCountry } from '@covid/core/localisation/LocalisationService';
import { patientService } from '@covid/core/patient/PatientService';
import { updateActiveNotification } from '@covid/core/state';
import { TRootState } from '@covid/core/state/root';
import {
  selectCanOptInOfWiderHealthStudies,
  selectCanOptOutOfWiderHealthStudies,
  selectStartupInfo,
} from '@covid/core/state/selectors';
import { selectUser } from '@covid/core/state/user';
import { LinksSection } from '@covid/features/menu/LinksSection';
import { MenuItem } from '@covid/features/menu/MenuItem';
import { useLogout } from '@covid/features/menu/useLogout';
import { useStartReconsent } from '@covid/features/wider-health-studies/hooks/useStartReconsent';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import Constants from '@covid/utils/Constants';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const isDevChannel = Constants.manifest.releaseChannel === '0-dev';

const onPressShare = () => share(i18n.t('share-this-app.message'));

const onPressProfile = () => NavigatorService.navigate('SelectProfile', { assessmentFlow: false });

const onPressMediaCentre = () => NavigatorService.navigate('MediaCentre');

const hitSlop = {
  bottom: 12,
  left: 12,
  right: 12,
  top: 12,
};

type TProps = DrawerContentComponentProps;

export const DrawerMenu: React.FC<TProps> = (props: TProps) => {
  const startupInfo = useSelector(selectStartupInfo);
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);
  const canOptOutOfWiderHealthStudies = useSelector(selectCanOptOutOfWiderHealthStudies);
  const canOptInOfWiderHealthStudies = useSelector(selectCanOptInOfWiderHealthStudies);
  const user = useSelector(selectUser);
  const logout = useLogout(props.navigation);
  const startReconsent = useStartReconsent();
  const dispatch = useDispatch();

  const onPressWiderHealthStudies = React.useCallback(async () => {
    if (startupInfo?.active_notifications?.notifications_wider_health_studies) {
      // Don't wait on it to be finished because this user interaction should be instant.
      patientService.updatePatientInfo(patientId, { notifications_wider_health_studies: false });
      // But we also want the dot to be gone instantly.
      dispatch(
        updateActiveNotification({
          notification: 'notifications_wider_health_studies',
          value: false,
        }),
      );
    }
    if (canOptInOfWiderHealthStudies) {
      startReconsent('Menu');
    } else {
      NavigatorService.navigate('WiderHealthStudies');
    }
  }, [canOptInOfWiderHealthStudies]);

  let sidenote = '';
  if (canOptOutOfWiderHealthStudies) {
    sidenote = i18n.t('menu.opted-in');
  } else if (canOptInOfWiderHealthStudies) {
    sidenote = i18n.t('menu.opt-in');
  }

  return (
    <Screen noHeader noKeyboardDismiss noPadding backgroundColor="white" testID="menu">
      <View style={styles.paddingHorizontal}>
        <View style={styles.headerWrapper}>
          <CaptionText>
            {`Version `}
            {Constants.manifest.revisionId ? Constants.manifest.revisionId : Constants.manifest.version}
            {isDevChannel ? ` (DEV)` : ''}
          </CaptionText>
          <TouchableOpacity hitSlop={hitSlop} onPress={NavigatorService.closeDrawer}>
            <Image source={closeIcon} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>

        <MenuItem
          analyticsName="EDIT_PROFILE"
          IconComponent={EditProfilesIcon}
          label={i18n.t('menu.item-edit-profile')}
          onPress={onPressProfile}
          testID="menu-item-edit-profile"
        />

        <MenuItem
          analyticsName="SHARE"
          IconComponent={ShareIcon}
          label={i18n.t('menu.item-share-this-app')}
          onPress={onPressShare}
          testID="menu-item-share"
        />

        {isGBCountry() ? (
          <MenuItem
            analyticsName="WIDER_HEALTH_STUDIES"
            IconComponent={HeartIcon}
            label={i18n.t('menu.item-wider-health-studies')}
            onPress={onPressWiderHealthStudies}
            showDot={startupInfo?.active_notifications?.notifications_wider_health_studies}
            sidenote={sidenote}
            sidenoteColor={startupInfo?.wider_health_studies_consent ? 'gray' : 'blue'}
            testID="menu-item-wider-health-studies"
          />
        ) : null}

        {startupInfo?.is_tester ? (
          <MenuItem
            showDot
            analyticsName="MEDIA_CENTRE"
            IconComponent={MediaIcon}
            label={i18n.t('menu.item-media-centre')}
            onPress={onPressMediaCentre}
            testID="menu-media-centre"
          />
        ) : null}

        <LinksSection navigation={props.navigation} />

        <TouchableOpacity onPress={logout} style={styles.touchable} testID="menu-item-logout">
          <Text inverted colorPalette="uiDark" colorShade="darker" textClass="h4">
            {i18n.t('logout')}
          </Text>
          <CaptionText style={styles.marginTop}>{user.username}</CaptionText>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  closeIcon: {
    height: 24,
    width: 24,
  },
  headerWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    height: sizes.headerCompactHeight,
    justifyContent: 'space-between',
  },
  marginTop: {
    marginTop: sizes.xs,
  },
  paddingHorizontal: {
    paddingHorizontal: sizes.m,
  },
  touchable: {
    marginBottom: sizes.xl,
    marginTop: sizes.m,
  },
});
