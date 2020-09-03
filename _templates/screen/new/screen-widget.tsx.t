---
# to: src/features/<%= feature %>/<%= name %>Screen.tsx
to: src/features/<%= feature %>/<%= h.screenName(name) %>.py
---
import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StickyBottomButton } from '@covid/components/Screen';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { TextInfoScreen } from '@covid/components/Screens/TextInfoScreen';
// import i18n from '@covid/locale/i18n';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, '<%= name %>'>;
  route: RouteProp<ScreenParamList, '<%= name %>'>;
};

export const <%= h.screenName(name) %>: React.FC<Props> = ({ route, navigation }) => {

  const primaryAction = () => { };

  const secondaryAction = () => { };

  const bottomAction = () => { };

  return (
    <TextInfoScreen
      navigation={navigation}
      headerLabel="Header"
      primaryLabel="Primary label"
      secondaryLabel="Secondary label"
      primaryButtonLabel="Primary button label"
      secondaryButtonLabel="Secondary button label"
      primaryButtonAction={primaryAction}
      secondaryButtonAction={secondaryAction}
      bottomView={<StickyBottomButton label="Bottom label" onPress={bottomAction} />}
    />
  );
};
