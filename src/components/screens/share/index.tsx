import { closeIcon } from '@assets';
import { IconButton, ThemeButton } from '@covid/components/buttons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Sharing from 'expo-sharing';
import * as React from 'react';
import { Dimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { captureRef } from 'react-native-view-shot';

import ShareContainer from './Container';
import ShareLabel from './Label';
import { SButtonView, SCloseContainerView, SContainerView, SContentView, SInnerContentView } from './styles';

function ShareScreen() {
  const navigation = useNavigation();
  const { height, width } = Dimensions.get('window');
  const { bottom, top } = useSafeAreaInsets();
  const viewRef = React.useRef<View>(null);
  const route = useRoute();
  const sharable = route?.params?.sharable;
  const hideLabel = route?.params?.hideLabel;
  const label = route?.params?.label;

  const share = async () => {
    try {
      const uri = await captureRef(viewRef, { format: 'jpg' });
      Sharing.shareAsync(`file://${uri}`);
    } catch (_) {}
  };

  return (
    <SContainerView bottom={bottom} height={height} top={top} width={width}>
      <SCloseContainerView>
        <IconButton imgSrc={closeIcon} onPress={navigation.goBack} />
      </SCloseContainerView>
      <SContentView>
        <SInnerContentView collapsable={false} ref={viewRef}>
          <ShareContainer sharable={sharable} />
          {!hideLabel ? <ShareLabel label={label} /> : null}
        </SInnerContentView>
      </SContentView>
      <SButtonView>
        <ThemeButton colorPalette="blue" colorShade="main" onPress={share} title="Share" />
      </SButtonView>
    </SContainerView>
  );
}

export default ShareScreen;
