import React, { ReactNode } from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';

import { BasicPageFooter } from '@covid/components/layouts/footers';
import { BasicNavHeader } from '@covid/components/layouts/headers';
import SafeLayout from '@covid/components/layouts/safe-layout';
import { styling, useTheme } from '@covid/themes';

interface IProps {
  active?: boolean;
  children?: ReactNode;
  footerTitle?: string;
  hasStickyHeader?: boolean;
  headerBackgroundColor?: string;
  navChildren?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  withFooter?: boolean;
  withGutter?: boolean;
  withHeader?: boolean;
}

function BasicPage({
  active = true,
  children,
  footerTitle = '',
  hasStickyHeader = false,
  headerBackgroundColor = 'transparent',
  navChildren = null,
  onPress = () => null,
  style = {},
  withFooter = true,
  withGutter = false,
  withHeader = true,
}: IProps) {
  const theme = useTheme();
  return (
    <SafeLayout style={style}>
      <ScrollView
        contentContainerStyle={styling.flexGrow}
        stickyHeaderIndices={hasStickyHeader ? [0] : undefined}
        style={withGutter && { paddingHorizontal: theme.grid.gutter }}>
        {withHeader && (
          <BasicNavHeader backgroundColor={headerBackgroundColor} paddingHorizontal={withGutter ? 0 : undefined}>
            {navChildren}
          </BasicNavHeader>
        )}
        {children}
        {withFooter && (
          <BasicPageFooter
            active={active}
            onPress={onPress}
            paddingHorizontal={withGutter ? 0 : undefined}
            title={footerTitle}
          />
        )}
      </ScrollView>
    </SafeLayout>
  );
}

export default BasicPage;
