import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { Easing } from 'react-native-reanimated';

import { SelectableItem, Selectable } from '@covid/components/Inputs/Selectable';
import { colors } from '@theme';

import { RegularText, SecondaryText } from '../../Text';

export interface FoodFreqGroupItem {
  primaryLabel: string;
  secondaryLabel?: string;
  items: SelectableItem[];
}

interface Props extends FoodFreqGroupItem {
  onSelected?: (item: SelectableItem) => void;
}

const SelectedLabel: React.FC<{ title: string }> = ({ title }) => (
  <RegularText style={styles.selectedLabel}>{title}</RegularText>
);

const animate = (fn: any) => {
  Animated.timing(fn, {
    toValue: 1,
    duration: 224,
    easing: Easing.inOut(Easing.cubic),
  }).start();
};

export const FoodFreqGroup: React.FC<Props> = ({ primaryLabel, secondaryLabel, items, onSelected }) => {
  const opacity = { start: 0, end: 1 };
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<SelectableItem | null>(null);
  const fadeAnimation = useRef(new Animated.Value(opacity.start)).current;

  useEffect(() => {
    animate(fadeAnimation);
  }, [selectedItem, setSelectedItem]);

  const selectedLabel = (
    <Animated.View
      style={[
        {
          opacity: fadeAnimation,
        },
        styles.selectedLabelContainer,
      ]}>
      <SelectedLabel title={selectedItem?.title ?? ''} />
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setCollapsed(!collapsed);
        }}>
        <View style={styles.header}>
          <RegularText>{primaryLabel}</RegularText>
          <Text> </Text>
          {secondaryLabel && <SecondaryText>{secondaryLabel}</SecondaryText>}
        </View>
      </TouchableOpacity>
      {selectedItem && selectedLabel}
      <Collapsible enablePointerEvents={false} collapsed={collapsed}>
        <View style={{ height: 20 }} />
        <Selectable
          key={primaryLabel}
          items={items}
          resetAnimation={collapsed}
          onSelected={(selected) => {
            setTimeout(() => {
              setCollapsed(true);
            }, 214);
            setSelectedItem(selected);
            if (onSelected) onSelected(selected);
          }}
        />
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedLabel: {
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '300',
    marginTop: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
    color: colors.textDark,
    backgroundColor: colors.backgroundFour,
    overflow: 'hidden',
  },
  selectedLabelContainer: {
    alignSelf: 'flex-start',
  },
});
