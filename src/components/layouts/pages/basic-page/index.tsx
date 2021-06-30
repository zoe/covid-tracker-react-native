import { BasicPageFooter } from '@covid/components/layouts/footers';
import { BasicNavHeader } from '@covid/components/layouts/headers';
import SafeLayout from '@covid/components/layouts/safe-layout';
import { styling, useTheme } from '@covid/themes';
import * as React from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';

interface IProps {
  active?: boolean;
  children?: React.ReactNode;
  footerTitle?: string;
  hasStickyHeader?: boolean;
  headerBackgroundColor?: string;
  loading?: boolean;
  navChildren?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  withFooter?: boolean;
  withGutter?: boolean;
  withHeader?: boolean;
}

export default function BasicPage({
  active = true,
  children,
  footerTitle = '',
  hasStickyHeader = false,
  headerBackgroundColor = 'transparent',
  loading = false,
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
        style={withGutter && { paddingHorizontal: theme.grid.gutter }}
      >
        {withHeader ? (
          <BasicNavHeader backgroundColor={headerBackgroundColor} paddingHorizontal={withGutter ? 0 : undefined}>
            {navChildren}
          </BasicNavHeader>
        ) : null}
        {children}
      </ScrollView>
      {withFooter ? <BasicPageFooter active={active} loading={loading} onPress={onPress} title={footerTitle} /> : null}
    </SafeLayout>
  );
}
