import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { Easing } from 'react-native-reanimated';

import { SelectableItem, Selectable } from '@covid/components/Inputs/Selectable';
import { colors } from '@theme';
import { FoodFreqData } from '@covid/features/diet-study/fields/FoodFreqQuestion';
import { ValidationError } from '@covid/components/ValidationError';

import { RegularText, SecondaryText } from '../../Text';

export interface FoodFreqGroupItem {
  key: keyof FoodFreqData;
  primaryLabel: string;
  secondaryLabel?: string;
  items: SelectableItem[];
  headerOnTap?: (key: keyof FoodFreqData) => void;
}

interface Props extends FoodFreqGroupItem {
  error?: any;
  onSelected?: (item: SelectableItem) => void;
}

const SelectedLabel: React.FC<{ title: string }> = ({ title }) => (
  <RegularText style={styles.selectedLabel}>{title}</RegularText>
);

const animate = (fn: any) => {
  Animated.timing(fn, {
    toValue: 1,
    duration: 100,
    easing: Easing.inOut(Easing.cubic),
  }).start();
};

export const FoodFreqGroup: React.FC<Props> = ({
  primaryLabel,
  secondaryLabel,
  items,
  error,
  onSelected,
  ...props
}) => {
  const opacity = { start: 0, end: 1 };
  const [selectedItem, setSelectedItem] = useState<SelectableItem | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const fadeAnimation = useRef(new Animated.Value(opacity.start)).current;

  useEffect(() => {
    animate(fadeAnimation);
  }, [selectedItem, setSelectedItem]);

  const hasSelectedItem = selectedItem !== null;
  const shouldShowItems = !hasSelectedItem || isOpen;

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
          if (!hasSelectedItem) {
            return;
          }
          setIsOpen(!isOpen);
          if (props.headerOnTap) props.headerOnTap(props.key);
        }}>
        <View style={styles.header}>
          <RegularText>{primaryLabel}</RegularText>
          <Text> </Text>
          {secondaryLabel && <SecondaryText>{secondaryLabel}</SecondaryText>}
        </View>
        {selectedItem && selectedLabel}
        {error && (
          <View style={{ marginTop: 4 }}>
            <ValidationError error={error} style={styles.validationError} />
          </View>
        )}
      </TouchableOpacity>
      {shouldShowItems && (
        <>
          <View style={{ height: 20 }} />
          <Selectable
            key={primaryLabel}
            items={items}
            onSelected={(selected) => {
              setSelectedItem(selected);
              setIsOpen(false);
              if (onSelected) onSelected(selected);
            }}
          />
        </>
      )}
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
  validationError: {
    marginTop: 0,
    marginHorizontal: 0,
  },
});
