import React, { useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { colors } from '@theme';
import { RegularText } from '@covid/components/Text';

interface IProps {
  labels: string[];
  onSelected: (label: string, index: number) => void;

  styles?: StyleProp<ViewStyle>;
}

export function Tabs({ labels, onSelected, ...props }: IProps) {
  const [translateValue] = useState(new Animated.Value(0));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabWidth = 96;

  const onTabBarPress = (index: number) => {
    Animated.spring(translateValue, {
      toValue: index * tabWidth,
      damping: 14,
      mass: 0.6,
      stiffness: 100,
      useNativeDriver: true,
    }).start();
    setSelectedIndex(index);
    onSelected(labels[index], index);
  };

  return (
    <View style={[styles.container, props.styles]}>
      <View>
        <View style={StyleSheet.absoluteFillObject}>
          <Animated.View
            style={[
              {
                width: tabWidth,
                transform: [{ translateX: translateValue }],
              },
            ]}
          >
            <View style={styles.indicatorBar} />
          </Animated.View>
        </View>
      </View>

      {labels.map((label, index) => {
        const labelStyle = selectedIndex === index ? styles.selectedLabel : styles.idleLabel;
        return (
          <TouchableOpacity
            key={label}
            onPress={() => {
              onTabBarPress(index);
            }}
          >
            <View
              style={[
                styles.tab,
                {
                  width: tabWidth,
                },
              ]}
            >
              <RegularText style={[styles.label, labelStyle]}>{label}</RegularText>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },

  tab: {
    alignItems: 'center',
  },

  label: {
    fontSize: 14,
  },

  idleLabel: {},

  selectedLabel: {
    color: colors.brand,
  },

  indicatorBar: {
    display: 'flex',
    marginHorizontal: 24,
    height: 2,
    backgroundColor: colors.brand,
    top: 36,
  },
});
