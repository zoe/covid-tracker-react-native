import { Icon } from '@covid/components/icons';
import { Profile } from '@covid/core/profile/ProfileService';
import * as React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

import Option from './Option';

const { height } = Dimensions.get('window');
const size = 72;

interface IProps {
  profiles: Profile[];
}

function Fab({ profiles }: IProps) {
  const [active, setActive] = React.useState(false);

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
              handleOnPress={() => handleOnPress(option)}
              key={key}
              label={option.name ?? ''}
              toValue={toValue}
              yValue={yValue}
            />
          );
        })}
        <TouchableOpacity
          accessible
          accessibilityRole="button"
          onPress={() => setActive(!active)}
          style={styles.button}
        >
          <Icon iconName="health-insurance" iconSize={32} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'pink',
    borderRadius: size * 0.5,
    height: size,
    justifyContent: 'center',
    width: size,
  },
  container: {
    position: 'absolute',
    right: 24,
    top: height - (size + 24),
  },
  smlButton: {
    alignItems: 'center',
    backgroundColor: 'purple',
    borderRadius: size * 0.8 * 0.5,
    height: size * 0.8,
    justifyContent: 'center',
    width: size * 0.8,
  },
});

export default Fab;
