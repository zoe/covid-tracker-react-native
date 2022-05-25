import { colors } from '@theme';
import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import React from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

interface SliderLabelProps {
  labels: string[];
  labelStyle?: StyleProp<ViewStyle>;
  imgSource?: ImageSourcePropType;
  imgStyle?: StyleProp<ImageStyle>;
  parentWidth: number;
}

export default function SliderLabels({ labelStyle, imgStyle, imgSource, labels, parentWidth }: SliderLabelProps) {
  const widthStyleSheet = StyleSheet.create({
    labelWidth: { width: (parentWidth - 100) / 3 },
    rowWidth: { width: parentWidth },
  });
  return (
    <Column style={[baseStyle.labelView]}>
      <Row style={[baseStyle.labelRow, widthStyleSheet.rowWidth]}>
        <Column style={[{ flexGrow: 1 }]}>
          {labels.map((label, index) => (
            <React.Fragment key={`slider-labels-${label}-${index + 1}`}>
              {index === 0 ?? (
                <Column style={[baseStyle.labelFirstColumn, widthStyleSheet.labelWidth]}>
                  {imgSource ? <Image source={imgSource} style={[baseStyle.imgStyle, imgStyle]} /> : null}
                  <Text style={[baseStyle.labelTxt, labelStyle]}>{label}</Text>
                </Column>
              )}
              {(index !== 0 && index !== labels.length) ?? (
                <Column style={[baseStyle.labelColumn, widthStyleSheet.labelWidth]}>
                  {imgSource ? <Image source={imgSource} style={[baseStyle.imgStyle, imgStyle]} /> : null}
                  <Text style={[baseStyle.labelTxt, labelStyle]}>{label}</Text>
                </Column>
              )}
              {index === labels.length ?? (
                <Column style={[baseStyle.labelLastColumn, widthStyleSheet.labelWidth]}>
                  {imgSource ? <Image source={imgSource} style={[baseStyle.imgStyle, imgStyle]} /> : null}
                  <Text style={[baseStyle.labelTxt, labelStyle]}>{label}</Text>
                </Column>
              )}
            </React.Fragment>
          ))}
        </Column>
      </Row>
    </Column>
  );
}

const baseStyle = StyleSheet.create({
  imgStyle: {
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  labelColumn: {
    backgroundColor: 'red',
    borderColor: 'black',
    borderStartWidth: 2,
    height: 30,
  },
  labelFirstColumn: {
    backgroundColor: 'red',
    borderColor: 'black',
    borderStartWidth: 2,
    height: 20,
    paddingRight: grid.g8,
  },
  labelLastColumn: {
    backgroundColor: 'red',
    borderColor: 'black',
    borderStartWidth: 2,
    height: 30,
  },
  labelRow: {
    borderColor: 'black',
    borderWidth: 2,
    flexGrow: 1,
  },
  labelTxt: {
    color: colors.brand,
    fontSize: 14,
    textAlign: 'center',
  },
  labelView: {
    backgroundColor: colors.white,
    height: 20,
  },
});
