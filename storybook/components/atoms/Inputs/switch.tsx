import { colors } from '@tracer/branding/colors';
import React, { useState } from 'react';
import { StyleSheet, Switch } from 'react-native';

type SwitchProps = {
  state: boolean;
  trackColor?: string;
  thumbColor?: string;
  onToggle: (state: boolean) => void;
};

/**
 * Column
 *
 * @param children components to display inside the column
 */
export default function InputSwitch({ onToggle, state = false, trackColor, thumbColor }: SwitchProps) {
  const [stateSwitch, setSwitch] = useState<boolean>(state);
  const onValueChange = () => {
    setSwitch((previousState) => !previousState);
    onToggle(!stateSwitch);
  };

  const trackStyle = trackColor || baseStyles.track.backgroundColor;
  const thumbStyle = thumbColor || baseStyles.thumb.backgroundColor;
  return (
    <Switch
      // ios_backgroundColor={colors.tertiary}
      onValueChange={onValueChange}
      thumbColor={stateSwitch ? thumbStyle : colors.white}
      trackColor={{ false: colors.tertiary, true: trackStyle }}
      value={stateSwitch}
    />
  );
}

const baseStyles = StyleSheet.create({
  switch: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  thumb: {
    backgroundColor: colors.brand,
  },
  track: {
    backgroundColor: colors.interactive,
  },
});
