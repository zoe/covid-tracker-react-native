import React, { ReactNode } from 'react';
import { ScrollView } from 'react-native';

import { BasicPageFooter } from '../../footers';
import { BasicNavHeader } from '../../headers';
import SafeLayout from '../../safe-layout';

interface IProps {
  children: ReactNode;
  footerTitle: string;
  onPress: () => void;
}

function BasicPage({ children, footerTitle, onPress }: IProps) {
  return (
    <SafeLayout>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
        <BasicNavHeader />
        {children}
        <BasicPageFooter onPress={onPress} title={footerTitle} />
      </ScrollView>
    </SafeLayout>
  );
}

export default BasicPage;
