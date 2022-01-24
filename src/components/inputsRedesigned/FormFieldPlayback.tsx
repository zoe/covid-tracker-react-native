import { Text } from '@covid/components';
import { requiredFormMarker } from '@covid/components/Form';
import { FieldLabelRedesigned } from '@covid/components/Text';
import { sizes } from '@covid/themes';
import { colors } from '@theme/colors';
import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

interface ICommonProps {
  description?: string | null;
  label: string;
  required?: boolean;
  testID?: string;
  editOnPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

type TFieldTypeProps =
  | { multiSelect: true; playbackValues: string[]; playbackValue?: never }
  | { multiSelect?: false; playbackValue: string; playbackValues?: never };

type TProps = ICommonProps & TFieldTypeProps;

interface ISelectedTagProps {
  text: string;
}

function SelectedTag(props: ISelectedTagProps) {
  return (
    <View style={styles.tag}>
      <Text inverted colorPalette="uiDark" colorShade="dark" textClass="pSmallMedium">
        {props.text}
      </Text>
    </View>
  );
}

export function FormFieldPlayback(props: TProps) {
  return (
    <View style={[props.style]} testID={props.testID}>
      <FieldLabelRedesigned>
        {props.label}
        {props.required ? requiredFormMarker : null}
      </FieldLabelRedesigned>

      {props.description ? (
        <Text inverted colorPalette="accentBlue" colorShade="main" style={styles.marginBottom} textClass="pSmallMedium">
          {props.description}
        </Text>
      ) : null}

      {props.multiSelect ? (
        <>
          <View style={styles.selectedTags}>
            {props.playbackValues.length > 0
              ? props.playbackValues.map((value) => <SelectedTag key={value} text={value} />)
              : null}
          </View>

          {/* TODO need to add onPress handler for edit */}
          <TouchableOpacity onPress={props.editOnPress}>
            <Text inverted colorPalette="accentBlue" colorShade="main" textClass="pSmallMedium">
              Edit
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.row}>
          <Text inverted colorPalette="uiDark" colorShade="dark" style={styles.maxWidth} textClass="pMedium">
            {props.playbackValue}
          </Text>
          {/* TODO need to add onPress handler for edit */}
          <TouchableOpacity onPress={props.editOnPress}>
            <Text
              inverted
              colorPalette="accentBlue"
              colorShade="main"
              style={styles.marginLeft}
              textClass="pSmallMedium"
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: sizes.m,
  },
  marginLeft: {
    marginLeft: sizes.m,
  },
  maxWidth: {
    maxWidth: '90%',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectedTags: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: sizes.m,
  },
  tag: {
    backgroundColor: colors.backgroundTertiary,
    borderRadius: sizes.s,
    marginRight: sizes.xs,
    marginVertical: sizes.xxs,
    paddingHorizontal: sizes.s,
    paddingVertical: sizes.xs,
  },
});
