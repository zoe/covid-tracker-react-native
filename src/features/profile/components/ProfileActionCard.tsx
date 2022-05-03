import { RightArrow } from '@assets';
import { Text } from '@covid/components';
import { sizes, styling } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface IImageProps {
  opacity?: number;
}

interface IProps {
  color: string;
  description: string;
  image: React.FC<IImageProps>;
  onPress: () => void;
  testID?: string;
  title: string;
}
export const ProfileActionCard: React.FC<IProps> = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.touchable, { backgroundColor: `${props.color}35` }]}
      testID={`profile-action-card-${props.testID}`}
    >
      <View style={styling.row}>
        {props.image}
        <View style={styles.textBlock}>
          <Text rhythm={8} style={{ color: props.color }} textClass="h4Medium">
            {props.title}
          </Text>
          <View style={styles.row}>
            <RightArrow color={colors.primary} />
            <Text inverted colorPalette="uiDark" colorShade="darker" style={styles.marginLeft} textClass="p">
              {props.description}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  marginLeft: {
    marginLeft: sizes.xs,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  textBlock: {
    marginLeft: sizes.l,
    marginTop: sizes.s,
  },
  touchable: {
    borderRadius: sizes.m,
    marginBottom: sizes.m,
    paddingVertical: sizes.xs,
  },
});
