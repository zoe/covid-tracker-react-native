import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
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
import { Services } from '@covid/provider/services.types';
import appCoordinator from '@covid/features/AppCoordinator';
import { useInjection } from '@covid/provider/services.hooks';
import { IContentService } from '@covid/core/content/ContentService';
import Analytics, { events } from '@covid/core/Analytics';
import { Coordinates } from '@covid/core/AsyncStorageService';
import { IPatientService } from '@covid/core/patient/PatientService';
import { loadEstimatedCasesCartoMap } from '@covid/utils/files';

const MAP_HEIGHT = 246;

interface EmptyViewProps {
  primaryLabel?: string;
  secondaryLabel?: string;
  ctaLabel?: string;
  onPress: VoidFunction;
}

enum MapEventOrigin {
  Arrow = 'arrow',
  Map = 'map',
}

enum MapType {
  Carto = 'carto',
  ImageAsset = 'image_asset',
}

const EmptyView: React.FC<EmptyViewProps> = ({ onPress, ...props }) => {
  const [html, setHtml] = useState<string>('');

  const primaryLabel = props.primaryLabel ?? i18n.t('covid-cases-map.covid-in-x', { location: 'your area' });
  const secondaryLabel = props.secondaryLabel ?? i18n.t('covid-cases-map.update-postcode');
  const ctaLabel = props.ctaLabel ?? i18n.t('covid-cases-map.update-postcode-cta');

  const showUpdatePostcode = false;
  const showCartoMap = true;
  const root = showCartoMap ? { paddingTop: 0 } : {};

  const showMap = () => {
    Analytics.track(events.ESTIMATED_CASES_MAP_CLICKED, { origin: MapEventOrigin.Map });
    NavigatorService.navigate('EstimatedCases');
  };

  const onArrowTapped = () => {
    Analytics.track(events.ESTIMATED_CASES_MAP_CLICKED, { origin: MapEventOrigin.Arrow });
    NavigatorService.navigate('EstimatedCases');
  };

  useEffect(() => {
    Analytics.track(events.ESTIMATED_CASES_MAP_EMPTY_STATE_SHOWN);
    (async () => {
      try {
        setHtml(await loadEstimatedCasesCartoMap());
      } catch (_) {}
    })();
  }, []);

  return (
    <View style={[styles.root, root]}>
      {showCartoMap && (
        <View style={styles.mapContainer}>
          <TouchableOpacity activeOpacity={0.6} onPress={showMap}>
            <WebView originWhitelist={['*']} source={{ html }} style={styles.webview} pointerEvents="none" />
          </TouchableOpacity>
        </View>
      )}

      <View style={[styles.headerContainer, { width: '90%' }]}>
        <Header3Text style={[styles.primaryLabel, { marginTop: 4 }]}>{primaryLabel}</Header3Text>
        <View style={styles.emptyStateArrow}>
          <TouchableOpacity style={[styles.backIcon, { marginBottom: 8 }]} onPress={onArrowTapped}>
            <ChevronRight width={32} height={32} />
          </TouchableOpacity>
        </View>
        {showUpdatePostcode && <RegularText style={styles.secondaryLabel}>{secondaryLabel}</RegularText>}
      </View>

      {showUpdatePostcode && (
        <Button style={[styles.detailsButton, styles.postcodeButton]} onPress={onPress}>
          <Text style={[fontStyles.bodyLight, styles.detailsButtonLabel]}>{ctaLabel}</Text>
        </Button>
      )}
    </View>
  );
};

interface Props {}

type MapConfig = {
  coordinates: Coordinates;
  zoom: number;
};

const DEFAULT_MAP_CENTER: Coordinates = { lat: 53.963843, lng: -3.823242 };
const ZOOM_LEVEL_CLOSER = 10.5;
const ZOOM_LEVEL_FURTHER = 6;

export const EstimatedCasesMapCard: React.FC<Props> = ({}) => {
  const patientService = useInjection<IPatientService>(Services.Patient);
  const contentService = useInjection<IContentService>(Services.Content);
  const viewRef = useRef(null);
  const webViewRef = useRef<WebView>(null);

  const [displayLocation, setDisplayLocation] = useState<string>('your area');
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [activeCases, setActiveCases] = useState<number | null | undefined>(contentService.localData?.cases);
  const [showEmptyState, setShowEmptyState] = useState<boolean>(true);
  const [useCartoMap, setUseCartoMap] = useState<boolean>(true);
  const [html, setHtml] = useState<string>('');

  const [mapConfig, setMapConfig] = useState<MapConfig>({
    coordinates: DEFAULT_MAP_CENTER,
    zoom: ZOOM_LEVEL_FURTHER,
  });

  useEffect(() => {
    // Use carto map if map url is not avaliable
    const hasMapUrl = !!contentService.localData?.mapUrl;
    setUseCartoMap(!hasMapUrl);
    Analytics.track(events.ESTIMATED_CASES_MAP_SHOWN, { type: hasMapUrl ? MapType.ImageAsset : MapType.Carto });

    // Show empty state if data is missing
    if (!contentService.localData) {
      setShowEmptyState(true);
      return;
    }

    // Show to up date local data
    setDisplayLocation(contentService.localData!.name);
    setMapUrl(contentService.localData!.mapUrl);
    setActiveCases(contentService.localData?.cases);
    setShowEmptyState(false);

    // Update carto's map center if map url isn't avaliable
    if (!hasMapUrl) {
      syncMapCenter();
    }
  }, [contentService.localData]);

  useEffect(() => {
    if (!webViewRef.current) return;
    webViewRef.current!.call('updateMapView', mapConfig);
  }, [mapConfig, setMapConfig, webViewRef.current]);

  useEffect(() => {
    Analytics.track(events.ESTIMATED_CASES_MAP_EMPTY_STATE_SHOWN);
    (async () => {
      try {
        setHtml(await loadEstimatedCasesCartoMap());
      } catch (_) {}
    })();
  }, []);

  const syncMapCenter = () => {
    // Set defaults center
    const { lat, lng } = DEFAULT_MAP_CENTER;
    let config = { coordinates: { lat, lng }, zoom: ZOOM_LEVEL_FURTHER };

    // Use data from API
    if (contentService.localData?.mapConfig) {
      const { lat, lng } = contentService.localData.mapConfig!;
      config = { coordinates: { lat, lng }, zoom: ZOOM_LEVEL_CLOSER };
    }

    setMapConfig(config);
  };

  const onMapEvent = (type: string, data?: object) => {
    switch (type) {
      case 'mapLoaded':
        syncMapCenter();
        break;
    }
  };

  const map = (): React.ReactNode => {
    if (useCartoMap) {
      return (
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{ html }}
          style={styles.webview}
          onEvent={onMapEvent}
          pointerEvents="none"
        />
      );
    }
    return <Image source={{ uri: mapUrl ?? '' }} style={styles.webview} />;
  };

  const share = async () => {
    Analytics.track(events.ESTIMATED_CASES_MAP_SHARE_CLICKED);
    try {
      const uri = await captureRef(viewRef, { format: 'jpg' });
      // https://github.com/expo/expo/issues/6920#issuecomment-580966657
      Sharing.shareAsync('file://' + uri);
    } catch (_) {}
  };

  const showMap = () => {
    Analytics.track(events.ESTIMATED_CASES_MAP_CLICKED, { origin: MapEventOrigin.Arrow });
    NavigatorService.navigate('EstimatedCases');
  };

  const onMapTapped = () => {
    Analytics.track(events.ESTIMATED_CASES_MAP_CLICKED, { origin: MapEventOrigin.Map });
    NavigatorService.navigate('EstimatedCases');
  };

  if (showEmptyState) {
    return (
      <EmptyView
        onPress={async () => {
          const profile = await patientService.myPatientProfile();
          if (profile) appCoordinator.startEditLocation(profile!);
        }}
      />
    );
  }

  return (
    <View style={styles.root} ref={viewRef}>
      <View style={styles.headerContainer}>
        <Header3Text style={styles.primaryLabel}>
          {i18n.t('covid-cases-map.covid-in-x', { location: displayLocation })}
        </Header3Text>
        <MutedText style={styles.secondaryLabel}>{i18n.t('covid-cases-map.current-estimates')}</MutedText>
      </View>

      <View style={styles.mapContainer}>
        <TouchableOpacity activeOpacity={0.6} onPress={onMapTapped}>
          {map()}
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        {!!activeCases && (
          <View style={styles.statsRow}>
            <Header0Text style={styles.stats}>{activeCases}</Header0Text>
            <MutedText style={styles.statsLabel}>{i18n.t('covid-cases-map.active-cases-in-area')}</MutedText>
          </View>
        )}
        {!activeCases && (
          <View style={styles.statsRow}>
            <MutedText style={styles.statsLabel}>{i18n.t('covid-cases-map.not-enough-contributors')}</MutedText>
          </View>
        )}
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
    overflow: 'hidden',
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

  mapImage: {
    resizeMode: 'cover',
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

  emptyStateArrow: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    right: 0,
  },
});
