import React, { useRef } from 'react';
import { Dimensions, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { closeIcon } from '@assets';

import { ThemeButton, IconButton } from '../../Buttons';

import ShareContainer from './container';
import ShareLabel from './label';
import { SContainerView, SContentView, SInnerContentView, SButtonView, SCloseContainerView } from './styles';

function ShareScreen() {
  const Navigation = useNavigation();
  const { height, width } = Dimensions.get('window');
  const { bottom, top } = useSafeAreaInsets();
  const viewRef = useRef<View>(null);
  const route = useRoute();
  const sharable = route.params.sharable;
  const hideLabel = route.params.hideLabel;

  const share = async () => {
    try {
      const uri = await captureRef(viewRef, { format: 'jpg' });
      Sharing.shareAsync('file://' + uri);
    } catch (_) {}
  };

  return (
    <SContainerView bottom={bottom} height={height} top={top} width={width}>
      <SCloseContainerView>
        <IconButton imgSrc={closeIcon} onPress={() => Navigation.goBack()} />
      </SCloseContainerView>
      <SContentView>
        <SInnerContentView ref={viewRef} collapsable={false}>
          <ShareContainer sharable={sharable} />
          {!hideLabel && <ShareLabel />}
        </SInnerContentView>
      </SContentView>
      <SButtonView>
        <ThemeButton colorPalette="blue" colorShade="main" title="Share" onPress={share} />
      </SButtonView>
    </SContainerView>
  );
}

export default ShareScreen;
