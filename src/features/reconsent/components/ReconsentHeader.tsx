import { chevronLeft } from '@assets';
import { Text } from '@covid/components';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface IProps {
  showLogo?: boolean;
  showBackIcon?: boolean;
  showDots?: boolean;
}

function ReconsentHeader(props: IProps) {
  const navigation = useNavigation();
  return (
    <View style={styles.headerBar}>
      <View style={styles.left}>
        {props.showBackIcon ? (
          <TouchableOpacity
            onPress={navigation.goBack}
            style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}
          >
            <Image source={chevronLeft} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.center}>
        {props.showDots ? <Text>3 dots</Text> : null}
        {props.showLogo ? <Text>Logo</Text> : null}
      </View>
      <View style={styles.right} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {},
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {},
  right: {},
});

export default ReconsentHeader;
