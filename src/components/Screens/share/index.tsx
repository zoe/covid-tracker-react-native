import React, { useRef } from 'react';
import { Dimensions, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { useRoute } from '@react-navigation/native';

import { ThemeButton } from '../../Buttons';

import ShareContainer from './container';
import ShareLabel from './label';
import { SContainerView, SContentView, SButtonView } from './styles';

function ShareScreen() {
  const { height, width } = Dimensions.get('window');
  const viewRef = useRef<View>(null);
  const route = useRoute();
  const sharable = route.params.sharable;
  console.log('Sharable : ', sharable);

  const share = async () => {
    try {
      const uri = await captureRef(viewRef, { format: 'jpg' });
      Sharing.shareAsync('file://' + uri);
    } catch (_) {}
  };

  return (
    <SContainerView height={height} width={width} ref={viewRef}>
      <SContentView>
        <ShareContainer sharable={sharable} />
        <ShareLabel />
      </SContentView>
      <SButtonView>
        <ThemeButton colorPalette="blue" colorShade="main" title="Share" onPress={share} />
      </SButtonView>
    </SContainerView>
  );
}

export default ShareScreen;
