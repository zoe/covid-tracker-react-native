import { Menu } from '@assets/icons/Menu';
import { WithNotificationDot } from '@covid/components/WithNotificationDot';
import { TStateApp } from '@covid/core/state/app/types';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { sizes } from '@covid/themes';
import HealthStudyDrawerToggle from '@tracer/components/molecules/DrawerToggle';
import { useToggleRebrand } from 'health-study/redux/app/selectors';
import * as React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';

type TDrawerToggleProps = {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const hitSlop = {
  bottom: 12,
  left: 12,
  right: 12,
  top: 12,
};

export const DrawerToggle: React.FC<TDrawerToggleProps> = React.memo((props) => {
  const toggleReBrand = useSelector(useToggleRebrand);
  const startupInfo = useSelector(selectStartupInfo);
  const showNotificationDot = !!startupInfo?.active_notifications?.notifications_wider_health_studies;
  return toggleReBrand ? (
    <HealthStudyDrawerToggle onPress={props.onPress} showNotificationDot={showNotificationDot} />
  ) : (
    <TouchableOpacity
      accessible
      accessibilityLabel="Menu"
      accessibilityRole="button"
      hitSlop={hitSlop}
      onPress={props.onPress}
      style={props.style}
      testID={props.testID}
    >
      <WithNotificationDot showDot={showNotificationDot}>
        <Menu height={sizes.drawerToggle} width={sizes.drawerToggle} />
      </WithNotificationDot>
    </TouchableOpacity>
  );
});
