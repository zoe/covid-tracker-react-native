import React, { ReactNode } from 'react';
import { ScrollView } from 'react-native';

import { BasicPageFooter } from '../../footers';
import { BasicNavHeader } from '../../headers';
import SafeLayout from '../../safe-layout';

interface IProps {
  active?: boolean;
  children: ReactNode;
  footerTitle?: string;
  onPress?: () => void;
  withGutter?: boolean;
  withFooter?: boolean;
}

function BasicPage({
  active = true,
  children,
  footerTitle = '',
  onPress = () => null,
  withGutter = false,
  withFooter = true,
}: IProps) {
  return (
    <SafeLayout withGutter={withGutter}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <BasicNavHeader />
        {children}
        {withFooter && <BasicPageFooter active={active} onPress={onPress} title={footerTitle} />}
      </ScrollView>
    </SafeLayout>
  );
}

export default BasicPage;
