import { Text } from '@covid/components/typography';
import { WebView } from '@covid/components/WebView';
import { TCoordinates, TPersonalisedLocalData } from '@covid/core/AsyncStorageService';
import { patientService } from '@covid/core/patient/PatientService';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { appCoordinator } from '@covid/features/AppCoordinator';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import { loadEstimatedCasesCartoMap } from '@covid/utils/files';
import { useToggleRebrand } from '@health-study/redux/app/selectors';
import { useNavigation } from '@react-navigation/native';
import Button from '@tracer/components/atoms/Button';
import CovidTag from '@tracer/components/molecules/CovidTag';
import ShareButton from '@tracer/components/molecules/ShareButton';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import { ESharable } from '../screens/share/types';
import {
  COVID_SHARE_BTN_COLOR,
  covidStyles,
  HEALTH_STUDY_SHARE_BTN_COLOR,
  healthStudyStyles,
} from './EstimatedCaseMapCardStyle';

interface IEmptyViewProps {
  primaryLabel?: string;
  secondaryLabel?: string;
  ctaLabel?: string;
  onPress: VoidFunction;
}

function EmptyView({ onPress, ...props }: IEmptyViewProps) {
  const [html, setHtml] = React.useState<string>('');

  const toggleReBrand = useSelector(useToggleRebrand);
  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>(selectStartupInfo);

  const primaryLabel = props.primaryLabel ?? i18n.t('covid-cases-map.covid-in-x', { location: 'your area' });
  const secondaryLabel = props.secondaryLabel ?? i18n.t('covid-cases-map.update-postcode');
  const ctaLabel = props.ctaLabel ?? i18n.t('covid-cases-map.update-postcode-cta');

  const [showUpdatePostcode, setShowUpdatePostcode] = React.useState<boolean | undefined>(
    startupInfo?.show_edit_location,
  );
  const showCartoMap = true;
  const root = showCartoMap ? { paddingTop: 0 } : {};

  const showMap = () => {
    NavigatorService.navigate('EstimatedCases');
  };

  React.useEffect(() => setShowUpdatePostcode(startupInfo?.show_edit_location), [startupInfo]);

  React.useEffect(() => {
    let isMounted = true;
    const runAsync = async () => {
      try {
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

  const styles = toggleReBrand ? healthStudyStyles : covidStyles;
  return (
    <View style={[styles.root, root]}>
      <View style={{ marginVertical: sizes.l, paddingHorizontal: sizes.m }}>
        <Text rhythm={8} textClass="h4">
          {primaryLabel}
        </Text>
        <Text inverted colorPalette="uiDark" colorShade="dark" textClass="pSmallLight">
          {i18n.t('covid-cases-map.current-estimates')}
        </Text>
      </View>

      {showCartoMap ? (
        <View style={styles.mapContainer}>
          <TouchableOpacity activeOpacity={0.6} onPress={showMap}>
            <WebView originWhitelist={['*']} pointerEvents="none" source={{ html }} style={styles.webview} />
          </TouchableOpacity>
        </View>
      ) : null}
      {showUpdatePostcode ? (
        <>
          <View style={{ paddingHorizontal: sizes.m, paddingVertical: sizes.m }}>
            <Text inverted colorPalette="uiDark" colorShade="dark" textClass="pSmallLight">
              {secondaryLabel}
            </Text>
          </View>
          <View style={{ paddingHorizontal: sizes.m }}>
            <Button onPress={onPress} style={styles.detailsButton}>
              <Text colorPalette="burgundy" textClass="pLight">
                {ctaLabel}
              </Text>
            </Button>
          </View>
        </>
      ) : null}
    </View>
  );
}

interface IProps {
  isSharing?: boolean;
}

type TMapConfig = {
  coordinates: TCoordinates;
  zoom: number;
};

const DEFAULT_MAP_CENTER: TCoordinates = { lat: 53.963843, lng: -3.823242 };
const ZOOM_LEVEL_CLOSER = 10.5;
const ZOOM_LEVEL_FURTHER = 6;

export function EstimatedCasesMapCard({ isSharing }: IProps) {
  const { navigate } = useNavigation();

  const toggleReBrand = useSelector(useToggleRebrand);
  const localData = useSelector<TRootState, TPersonalisedLocalData | undefined>(
    (state) => state.content.personalizedLocalData,
  );

  const viewRef = React.useRef(null);
  const webViewRef = React.useRef<WebView>(null);

  const [displayLocation, setDisplayLocation] = React.useState<string>('your area');
  const [mapUrl, setMapUrl] = React.useState<string | null>(null);
  const [showEmpty, setShowEmpty] = React.useState<boolean>(true);
  const [useCartoMap, setUseCartoMap] = React.useState<boolean>(true);
  const [html, setHtml] = React.useState<string>('');

  const [mapConfig, setTMapConfig] = React.useState<TMapConfig>({
    coordinates: DEFAULT_MAP_CENTER,
    zoom: ZOOM_LEVEL_FURTHER,
  });

  React.useEffect(() => {
    // Use carto map if map url is not avaliable
    const hasMapUrl = !!localData?.mapUrl;
    setUseCartoMap(!hasMapUrl);

    // Show empty state if data is missing
    if (!localData) {
      setShowEmpty(true);
      return;
    }

    // Show to up date local data
    setDisplayLocation(localData!.name);
    setMapUrl(localData!.mapUrl);
    setShowEmpty(false);

    // Update carto's map center if map url isn't avaliable
    if (!hasMapUrl) {
      syncMapCenter();
    }
  }, [localData]);

  React.useEffect(() => {
    if (!webViewRef.current) return;
    webViewRef.current!.call('updateMapView', mapConfig);
  }, [mapConfig, setTMapConfig, webViewRef.current]);

  React.useEffect(() => {
    let isMounted = true;
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
    let config = {
      coordinates: { lat: DEFAULT_MAP_CENTER.lat, lng: DEFAULT_MAP_CENTER.lng },
      zoom: ZOOM_LEVEL_FURTHER,
    };

    // Use data from API
    if (localData?.mapConfig) {
      config = {
        coordinates: { lat: localData.mapConfig.lat, lng: localData.mapConfig.lng },
        zoom: ZOOM_LEVEL_CLOSER,
      };
    }

    setTMapConfig(config);
  };

  const onEvent = (type: string) => {
    if (type === 'mapLoaded') {
      syncMapCenter();
    }
  };

  const styles = toggleReBrand ? healthStudyStyles : covidStyles;
  const shareBtnColor = toggleReBrand ? HEALTH_STUDY_SHARE_BTN_COLOR : COVID_SHARE_BTN_COLOR;
  const map = (): React.ReactNode => {
    if (useCartoMap) {
      return (
        <WebView
          onEvent={onEvent}
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
    navigate('Share', { sharable: ESharable.MAP });
  };

  const onMapTapped = () => {
    NavigatorService.navigate('EstimatedCases');
  };

  if (showEmpty) {
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
        <View style={{ marginVertical: isSharing ? 4 : 24, paddingHorizontal: sizes.m }}>
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

      {!isSharing ? (
        <ShareButton
          label={i18n.t('covid-cases-map.share')}
          onPress={share}
          shareIconStrokeColor={shareBtnColor}
          textStyle={{ color: shareBtnColor }}
        />
      ) : null}
      <CovidTag />
    </View>
  );
}
