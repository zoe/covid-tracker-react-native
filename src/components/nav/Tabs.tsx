import { RegularText } from '@covid/components/Text';
import { colors } from '@theme';
import React, { useState } from 'react';
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
      damping: 14,
      mass: 0.6,
      stiffness: 100,
      toValue: index * tabWidth,
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
                transform: [{ translateX: translateValue }],
                width: tabWidth,
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

  idleLabel: {},

  indicatorBar: {
    backgroundColor: colors.brand,
    display: 'flex',
    height: 2,
    marginHorizontal: 24,
    top: 36,
  },

  label: {
    fontSize: 14,
  },

  selectedLabel: {
    color: colors.brand,
  },

  tab: {
    alignItems: 'center',
  },
});
