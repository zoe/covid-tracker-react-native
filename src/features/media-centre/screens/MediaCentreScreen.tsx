import { HeaderText } from '@covid/components';
import { BackButton } from '@covid/components/BackButton';
import { Screen } from '@covid/components/Screen';
import MediaCentreTabbedListsScreen from '@covid/features/media-centre/screens/MediaCentreTabbedListsScreen';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

const SINGLE_ROW_HEIGHT = 185; // amend once we have final design
const HEIGHT_OF_STATIC_CONTENT = 200; // amend once we have final design

export const MediaCentreScreen: React.FC = React.memo(() => {
  const windowDimensions = useWindowDimensions();

  const minTabViewHeight = SINGLE_ROW_HEIGHT * 2; // amend once we have final design
  const tabViewHeight = windowDimensions.height - HEIGHT_OF_STATIC_CONTENT;

  function renderHeader() {
    return (
      <View style={styles.headerWrapper}>
        <BackButton />
        <View style={styles.textWrapper}>
          <HeaderText>{i18n.t('media-centre.title')}</HeaderText>
        </View>
      </View>
    );
  }

  return (
    <Screen renderHeader={renderHeader} testID="media-centre-screen">
      <MediaCentreTabbedListsScreen
        minTabViewHeight={minTabViewHeight}
        showTab={i18n.t('media-centre.tab-all')}
        tabViewHeight={tabViewHeight}
      />
    </Screen>
  );
});

const styles = StyleSheet.create({
  headerWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: sizes.screenHorizontalPadding,
    paddingTop: sizes.screenVerticalPadding,
  },
  textWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: sizes.m,
  },
});
