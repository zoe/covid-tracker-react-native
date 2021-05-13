import { closeIcon } from '@assets';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Sharing from 'expo-sharing';
import React, { useRef } from 'react';
import { Dimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { captureRef } from 'react-native-view-shot';

import { IconButton, ThemeButton } from '../../buttons';
import ShareContainer from './Container';
import ShareLabel from './Label';
import { SButtonView, SCloseContainerView, SContainerView, SContentView, SInnerContentView } from './styles';

function ShareScreen() {
  const Navigation = useNavigation();
  const { height, width } = Dimensions.get('window');
  const { bottom, top } = useSafeAreaInsets();
  const viewRef = useRef<View>(null);
  const route = useRoute();
  const { sharable } = route.params;
  const { hideLabel } = route.params;
  const { label } = route.params;

  const share = async () => {
    try {
      const uri = await captureRef(viewRef, { format: 'jpg' });
      Sharing.shareAsync(`file://${uri}`);
    } catch (_) {}
  };

  return (
    <SContainerView bottom={bottom} height={height} top={top} width={width}>
      <SCloseContainerView>
        <IconButton imgSrc={closeIcon} onPress={() => Navigation.goBack()} />
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
