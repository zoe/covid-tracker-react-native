import { colors } from '@covid/themes';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface IProps {
  amount: number;
  onSelection: (index: number) => void;
  selectedIndex: number;
}

export default React.memo(function PaginationIndicator(props: IProps) {
  return (
    <View pointerEvents="box-none" style={styles.view}>
      {Array(props.amount)
        .fill(null)
        .map((_, index: number) => (
          // It's not possible to change the opacity of an TouchableOpacity, that's why the extra View is used.
          <TouchableOpacity
            // eslint-disable-next-line react/no-array-index-key
            key={`touchable-${index}`}
            onPress={props.onSelection && props.onSelection.bind(null, index)}
          >
            <View style={index === props.selectedIndex ? styles.selectedDot : styles.dot} />
          </TouchableOpacity>
        ))}
    </View>
  );
});

const dotStyle = {
  backgroundColor: colors.accentBlue.main.bgColor,
  borderRadius: 4,
  height: 8,
  margin: 8,
  width: 8,
};

const styles = StyleSheet.create({
  dot: {
    ...dotStyle,
    opacity: 0.4,
  },
  selectedDot: dotStyle,
  view: {
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
