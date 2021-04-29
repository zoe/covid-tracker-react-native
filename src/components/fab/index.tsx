import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';

import { Profile } from '@covid/core/profile/ProfileService';

import { Icon } from '../icons';

import Option from './option';

const { height } = Dimensions.get('window');
const size = 72;

interface IProps {
  profiles: Profile[];
}

function Fab({ profiles }: IProps) {
  const [active, setActive] = useState(false);

  const handleOnPress = (profile: Profile) => {
    // TODO - navigate to...
    setActive(false);
  };

  return (
    <>
      {active ? <View style={styles.backdrop} /> : null}
      <View style={styles.container}>
        {profiles.map((option, index) => {
          const key = `option-${index}`;
          const yValue = -((index + 1) * size);
          const toValue = active ? 1 : 0;
          return (
            <Option
              key={key}
              handleOnPress={() => handleOnPress(option)}
              label={option.name ?? ''}
              toValue={toValue}
              yValue={yValue}
            />
          );
        })}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setActive(!active)}
          accessible
          accessibilityRole="button">
          <Icon iconName="health-insurance" iconSize={32} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    top: height - (size + 24),
    position: 'absolute',
    right: 24,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'pink',
    borderRadius: size * 0.5,
    height: size,
    justifyContent: 'center',
    width: size,
  },
  smlButton: {
    alignItems: 'center',
    backgroundColor: 'purple',
    borderRadius: size * 0.8 * 0.5,
    height: size * 0.8,
    justifyContent: 'center',
    width: size * 0.8,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});

export default Fab;
