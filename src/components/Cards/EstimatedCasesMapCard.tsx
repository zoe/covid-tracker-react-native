import React, { useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'native-base';
import { captureRef } from 'react-native-view-shot';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Sharing from 'expo-sharing';

import { WebView } from '@covid/components/WebView';
import { Header0Text, Header3Text, MutedText, RegularText } from '@covid/components/Text';
import { colors, fontStyles } from '@theme';
import ChevronRight from '@assets/icons/ChevronRight';
import Share from '@assets/icons/Share';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { ICoreService } from '@covid/core/user/UserService';
import { Services } from '@covid/provider/services.types';
import appCoordinator from '@covid/features/AppCoordinator';
import { useInjection } from '@covid/provider/services.hooks';

const MAP_HEIGHT = 246;

const html = require('@assets/carto/estimated-cases.html');

interface EmptyViewProps {
  primaryLabel?: string;
  secondaryLabel?: string;
  ctaLabel?: string;
  onPress: VoidFunction;
}

const EmptyView: React.FC<EmptyViewProps> = ({ onPress, ...props }) => {
  const primaryLabel = props.primaryLabel ?? i18n.t('covid-cases-map.covid-in-x', { location: 'your area' });
  const secondaryLabel = props.secondaryLabel ?? i18n.t('covid-cases-map.update-postcode');
  const ctaLabel = props.ctaLabel ?? i18n.t('covid-cases-map.update-postcode-cta');

  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <Header3Text style={styles.primaryLabel}>{primaryLabel}</Header3Text>
        <RegularText style={styles.secondaryLabel}>{secondaryLabel}</RegularText>
      </View>
      <Button style={[styles.detailsButton, styles.postcodeButton]} onPress={onPress}>
        <Text style={[fontStyles.bodyLight, styles.detailsButtonLabel]}>{ctaLabel}</Text>
      </Button>
    </View>
  );
};

interface Props {
  showEmptyState?: boolean;
}

export const EstimatedCasesMapCard: React.FC<Props> = ({ showEmptyState = true }) => {
  const userService = useInjection<ICoreService>(Services.User);
  const viewRef = useRef(null);
  const webViewRef = useRef<WebView>(null);
  const count = 0;
  const share = async () => {
    try {
      const uri = await captureRef(viewRef, { format: 'jpg' });
      // https://github.com/expo/expo/issues/6920#issuecomment-580966657
      Sharing.shareAsync('file://' + uri);
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  const showMap = () => {
    NavigatorService.navigate('EstimatedCases');
  };

  const updateMapCenter = (lat: number, lng: number) => {
    // lat: 51.513759, lng: -0.317859,
    webViewRef.current!.emit('new-center', {
      payload: { lat, lng },
    });
  };

  if (showEmptyState) {
    return (
      <EmptyView
        onPress={async () => {
          const profile = await userService.myPatientProfile();
          if (profile) appCoordinator.startEditLocation(profile!);
        }}
      />
    );
  }

  return (
    <View style={styles.root} ref={viewRef}>
      <View style={styles.headerContainer}>
        <Header3Text style={styles.primaryLabel}>
          {i18n.t('covid-cases-map.covid-in-x', { location: 'Midlands' })}
        </Header3Text>
        <MutedText style={styles.secondaryLabel}>{i18n.t('covid-cases-map.current-estimates')}</MutedText>
      </View>

      <View style={styles.mapContainer} pointerEvents="none">
        <WebView ref={webViewRef} originWhitelist={['*']} source={html} style={styles.webview} />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <Header0Text style={styles.stats}>{count}</Header0Text>
          <MutedText style={styles.statsLabel}>{i18n.t('covid-cases-map.active-cases-in-area')}</MutedText>
        </View>
        <TouchableOpacity style={styles.backIcon} onPress={showMap}>
          <ChevronRight width={32} height={32} />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.shareTouchable} onPress={share}>
        <Share style={styles.shareIcon} />
        <MutedText style={styles.shareLabel}>{i18n.t('covid-cases-map.share')}</MutedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    marginHorizontal: 32,
    paddingVertical: 8,
  },

  headerContainer: {
    marginVertical: 24,
  },

  primaryLabel: {
    fontWeight: '500',
    textAlign: 'center',
    color: colors.textDark,
  },

  secondaryLabel: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    paddingHorizontal: 24,
  },

  mapContainer: {
    width: '100%',
  },

  webview: {
    height: MAP_HEIGHT,
  },

  statsContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  statsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  stats: {
    fontWeight: '300',
    marginRight: 8,
  },

  statsLabel: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },

  backIcon: {},

  divider: {
    height: 1,
    width: '92%',
    alignSelf: 'center',
    backgroundColor: colors.backgroundFour,
  },

  shareTouchable: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 4,
  },

  shareIcon: {
    marginTop: 4,
    marginRight: 8,
  },

  shareLabel: {
    textAlign: 'center',
    color: colors.purple,
    fontSize: 14,
    fontWeight: '300',
  },

  detailsButton: {
    paddingHorizontal: 52,
    backgroundColor: 'transparent',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.purple,
  },

  detailsButtonLabel: {
    color: colors.purple,
    fontWeight: '300',
    fontSize: 14,
  },

  postcodeButton: {
    marginBottom: 20,
  },
});
