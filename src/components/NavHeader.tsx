import { BackButton } from '@covid/components/BackButton';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

type TProps = {
  backgroundColor?: string;
  rightElement?: React.ReactNode;
};

export function NavHeader(props: TProps) {
  return (
    <View style={[styles.view, props.backgroundColor ? { backgroundColor: props.backgroundColor } : undefined]}>
      <View style={styles.left}>
        <BackButton />
      </View>
      <View style={styles.flex} />
      <View style={styles.right}>{props.rightElement}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  left: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  right: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  view: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    overflow: 'visible',
    paddingHorizontal: sizes.screenHorizontalPadding,
    paddingVertical: sizes.screenVerticalPadding / 2,
  },
});
