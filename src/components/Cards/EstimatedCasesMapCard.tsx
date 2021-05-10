import { BrandedButton } from '@covid/components';
import { WebView } from '@covid/components/WebView';
import Analytics, { events } from '@covid/core/Analytics';
import { Coordinates, PersonalisedLocalData } from '@covid/core/AsyncStorageService';
import { IPatientService } from '@covid/core/patient/PatientService';
import { RootState } from '@covid/core/state/root';
import { StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import appCoordinator from '@covid/features/AppCoordinator';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { loadEstimatedCasesCartoMap } from '@covid/utils/files';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { ShareButton } from '../buttons';
import { Text } from '../typography';

const MAP_HEIGHT = 246;

interface IEmptyViewProps {
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

function EmptyView({ onPress, ...props }: IEmptyViewProps) {
  const [html, setHtml] = useState<string>('');

  const startupInfo = useSelector<RootState, StartupInfo | undefined>((state) => state.content.startupInfo);

  const primaryLabel = props.primaryLabel ?? i18n.t('covid-cases-map.covid-in-x', { location: 'your area' });
  const secondaryLabel = props.secondaryLabel ?? i18n.t('covid-cases-map.update-postcode');
  const ctaLabel = props.ctaLabel ?? i18n.t('covid-cases-map.update-postcode-cta');

  const [showUpdatePostcode, setShowUpdatePostcode] = useState<boolean | undefined>(startupInfo?.show_edit_location);
  const showCartoMap = true;
  const root = showCartoMap ? { paddingTop: 0 } : {};

  const showMap = () => {
    Analytics.track(events.ESTIMATED_CASES_MAP_CLICKED, { origin: MapEventOrigin.Map });
    NavigatorService.navigate('EstimatedCases');
  };

  useEffect(() => setShowUpdatePostcode(startupInfo?.show_edit_location), [startupInfo]);

  useEffect(() => {
    let isMounted = true;
    const runAsync = async () => {
      try {
        Analytics.track(events.ESTIMATED_CASES_MAP_EMPTY_STATE_SHOWN);
        const data = await loadEstimatedCasesCartoMap();
        if (isMounted) {
          setHtml(data);
        }
      } catch (_) {}
    };

    runAsync();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={[styles.root, root]}>
      <View style={{ marginVertical: 24, paddingHorizontal: 16 }}>
        <Text rhythm={8} textClass="h4">
          {primaryLabel}
        </Text>
        <Text inverted colorPalette="uiDark" colorShade="dark" textClass="pSmallLight">
          {i18n.t('covid-cases-map.current-estimates')}
        </Text>
      </View>

      {showCartoMap && (
        <View style={styles.mapContainer}>
          <TouchableOpacity activeOpacity={0.6} onPress={showMap}>
            <WebView originWhitelist={['*']} pointerEvents="none" source={{ html }} style={styles.webview} />
          </TouchableOpacity>
        </View>
      )}
      {showUpdatePostcode && (
        <>
          <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
            <Text inverted colorPalette="uiDark" colorShade="dark" textClass="pSmallLight">
              {secondaryLabel}
            </Text>
          </View>
          <View style={{ paddingHorizontal: 16 }}>
            <BrandedButton onPress={onPress} style={styles.detailsButton}>
              <Text colorPalette="burgundy" textClass="pLight">
                {ctaLabel}
              </Text>
            </BrandedButton>
          </View>
        </>
      )}
    </View>
  );
}

interface IProps {
  isSharing?: boolean;
}

type MapConfig = {
  coordinates: Coordinates;
  zoom: number;
};

const DEFAULT_MAP_CENTER: Coordinates = { lat: 53.963843, lng: -3.823242 };
const ZOOM_LEVEL_CLOSER = 10.5;
const ZOOM_LEVEL_FURTHER = 6;

export function EstimatedCasesMapCard({ isSharing }: IProps) {
  const { navigate } = useNavigation();
  const patientService = useInjection<IPatientService>(Services.Patient);

  const localData = useSelector<RootState, PersonalisedLocalData | undefined>(
    (state) => state.content.personalizedLocalData,
  );

  const viewRef = useRef(null);
  const webViewRef = useRef<WebView>(null);

  const [displayLocation, setDisplayLocation] = useState<string>('your area');
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [activeCases, setActiveCases] = useState<number | null | undefined>(localData?.cases);
  const [showEmptyState, setShowEmptyState] = useState<boolean>(true);
  const [useCartoMap, setUseCartoMap] = useState<boolean>(true);
  const [html, setHtml] = useState<string>('');

  const [mapConfig, setMapConfig] = useState<MapConfig>({
    coordinates: DEFAULT_MAP_CENTER,
    zoom: ZOOM_LEVEL_FURTHER,
  });

  useEffect(() => {
    // Use carto map if map url is not avaliable
    const hasMapUrl = !!localData?.mapUrl;
    setUseCartoMap(!hasMapUrl);
    Analytics.track(events.ESTIMATED_CASES_MAP_SHOWN, { type: hasMapUrl ? MapType.ImageAsset : MapType.Carto });

    // Show empty state if data is missing
    if (!localData) {
      setShowEmptyState(true);
      return;
    }

    // Show to up date local data
    setDisplayLocation(localData!.name);
    setMapUrl(localData!.mapUrl);
    setActiveCases(localData?.cases);
    setShowEmptyState(false);

    // Update carto's map center if map url isn't avaliable
    if (!hasMapUrl) {
      syncMapCenter();
    }
  }, [localData]);

  useEffect(() => {
    if (!webViewRef.current) return;
    webViewRef.current!.call('updateMapView', mapConfig);
  }, [mapConfig, setMapConfig, webViewRef.current]);

  useEffect(() => {
    let isMounted = true;
    Analytics.track(events.ESTIMATED_CASES_MAP_EMPTY_STATE_SHOWN);
    (async () => {
      try {
        if (isMounted) {
          setHtml(await loadEstimatedCasesCartoMap());
        }
      } catch (_) {}
    })();
    return function cleanUp() {
      isMounted = false;
    };
  }, []);

  const syncMapCenter = () => {
    // Set defaults center
    const { lat, lng } = DEFAULT_MAP_CENTER;
    let config = { coordinates: { lat, lng }, zoom: ZOOM_LEVEL_FURTHER };

    // Use data from API
    if (localData?.mapConfig) {
      const { lat, lng } = localData.mapConfig!;
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
          onEvent={onMapEvent}
          originWhitelist={['*']}
          pointerEvents="none"
          ref={webViewRef}
          source={{ html }}
          style={styles.webview}
        />
      );
    }
    return <Image source={{ uri: mapUrl ?? '' }} style={styles.webview} />;
  };

  const share = async () => {
    Analytics.track(events.ESTIMATED_CASES_MAP_SHARE_CLICKED);
    navigate('Share', { sharable: 'MAP' });
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
    <View style={styles.root}>
      <View collapsable={false} ref={viewRef} style={styles.snapshotContainer}>
        <View style={{ marginVertical: isSharing ? 4 : 24, paddingHorizontal: 16 }}>
          <Text rhythm={8} textClass="h4">
            {i18n.t('covid-cases-map.covid-in-x', { location: displayLocation })}
          </Text>
          <Text inverted colorPalette="uiDark" colorShade="dark" textClass="pSmallLight">
            {i18n.t('covid-cases-map.current-estimates')}
          </Text>
        </View>

        <View style={styles.mapContainer}>
          {isSharing ? (
            <>{map()}</>
          ) : (
            <TouchableOpacity activeOpacity={0.6} onPress={onMapTapped}>
              {map()}
            </TouchableOpacity>
          )}
        </View>
      </View>

      {!isSharing && (
        <>
          {/* <View style={styles.divider} />
          <TouchableOpacity style={styles.shareTouchable} onPress={share}>
            <Share style={styles.shareIcon} />
            <MutedText style={styles.shareLabel}>{i18n.t('covid-cases-map.share')}</MutedText>
          </TouchableOpacity> */}
          <View>
            <ShareButton label={i18n.t('covid-cases-map.share')} onPress={share} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backIcon: {},

  detailsButton: {
    backgroundColor: 'transparent',
    borderColor: colors.purple,
    borderWidth: 1,
    marginBottom: 24,
    paddingHorizontal: 52,
  },

  detailsButtonLabel: {
    color: colors.purple,
    fontSize: 14,
  },

  divider: {
    alignSelf: 'center',
    backgroundColor: colors.backgroundFour,
    height: 1,
    width: '92%',
  },

  emptyStateArrow: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },

  mapContainer: {
    width: '100%',
  },

  mapImage: {
    height: MAP_HEIGHT,
    resizeMode: 'cover',
  },

  postcodeButton: {
    marginBottom: 20,
  },

  primaryLabel: {
    color: colors.textDark,
    textAlign: 'center',
  },

  root: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginVertical: 8,
    overflow: 'hidden',
  },

  shareIcon: {
    marginRight: 8,
    marginTop: 4,
  },

  shareLabel: {
    color: colors.purple,
    fontSize: 14,
    textAlign: 'center',
  },

  shareTouchable: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
    paddingTop: 4,
  },

  snapshotContainer: {
    backgroundColor: colors.white,
    width: '100%',
  },

  stats: {
    marginRight: 8,
  },

  statsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    width: '100%',
  },

  statsLabel: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },

  statsRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },

  webview: {
    height: MAP_HEIGHT,
  },
});
