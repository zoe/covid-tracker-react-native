import React, { ReactNode } from 'react';
import { ScrollView } from 'react-native';

import { BasicPageFooter } from '../../footers';
import { BasicNavHeader } from '../../headers';
import SafeLayout from '../../safe-layout';

interface IProps {
  active?: boolean;
  children: ReactNode;
  footerTitle: string;
  onPress: () => void;
}

function BasicPage({ active = true, children, footerTitle, onPress }: IProps) {
  return (
    <SafeLayout withGutter={false}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
        <BasicNavHeader />
        {children}
        <BasicPageFooter active={active} onPress={onPress} title={footerTitle} />
      </ScrollView>
    </SafeLayout>
  );
}

export default BasicPage;
