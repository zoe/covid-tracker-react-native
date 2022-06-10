import Star from '@assets/mental-health-playback/Star';
import { Text, TextareaWithCharCount } from '@covid/components';
import Card from '@covid/components/cards/Card';
import { Screen } from '@covid/components/Screen';
import { homeScreenName } from '@covid/core/localisation/LocalisationService';
import { getMentalHealthFeedback } from '@covid/features/mental-health-playback/MentalHealthApiClient';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes, styling } from '@covid/themes';
import { colors } from '@theme';
import lodash from 'lodash';
import * as React from 'react';
import { LayoutChangeEvent, TouchableOpacity, View } from 'react-native';

const AMOUNT_STARS = 5;
const THROTTLE_TIME_MS = 250;

const ratings = Array(AMOUNT_STARS)
  .fill(null)
  .map((_, i) => i);

const throttledFunction = lodash.throttle((func) => func(), THROTTLE_TIME_MS);

export default function MHPRatingScreen() {
  const [cardWidth, setCardWidth] = React.useState(0);
  const [comments, setComments] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [selectedRating, setSelectedRating] = React.useState(0);

  const starSize = cardWidth / (AMOUNT_STARS * 2);
  const spacingSize = starSize / 2;

  async function onPress() {
    if (!loading) {
      setLoading(true);
      const result = await getMentalHealthFeedback(selectedRating, comments);
      if (result) {
        NavigatorService.reset([{ name: homeScreenName() }, { name: 'MentalHealthPlaybackThankYou' }]);
      }
      setLoading(false);
    }
  }

  function onLayout(event: LayoutChangeEvent) {
    setCardWidth(event.nativeEvent.layout.width);
  }

  return (
    <Screen
      backgroundColor={colors.white}
      footerEnabled={!loading && selectedRating > 0}
      footerLoading={loading}
      footerOnPress={() => throttledFunction(onPress)}
      footerTitle={i18n.t('mental-health-playback.rating.button')}
      testID="mhp-introduction-screen"
    >
      <Card useShadow padding={sizes.xl} style={[styling.marginTop, styling.marginBottomHuge]}>
        <View onLayout={onLayout} style={styling.measureWidth} />
        <Text
          inverted
          colorPalette="accentBlue"
          colorShade="main"
          style={styling.marginBottomBig}
          textAlign="center"
          textClass="h3Regular"
        >
          {i18n.t('mental-health-playback.rating.card')}
        </Text>
        <View style={styling.row}>
          {ratings.map((_, index) => (
            <TouchableOpacity
              // eslint-disable-next-line react/no-array-index-key
              key={`touchable-star-${index}`}
              onPress={() => setSelectedRating(index + 1)}
              style={{
                paddingHorizontal: spacingSize,
                paddingVertical: sizes.l,
              }}
            >
              <Star color={selectedRating - 1 >= index ? '#0165B5' : '#E2E2E2'} height={starSize} width={starSize} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styling.rowBetween}>
          <Text inverted colorPalette="accentBlue" colorShade="main" textClass="h6Regular">
            {i18n.t('mental-health-playback.rating.not-helpful')}
          </Text>
          <Text inverted colorPalette="accentBlue" colorShade="main" textClass="h6Regular">
            {i18n.t('mental-health-playback.rating.very-helpful')}
          </Text>
        </View>
      </Card>
      <Text
        inverted
        colorPalette="accentBlue"
        colorShade="main"
        style={styling.marginBottom}
        textAlign="center"
        textClass="p"
      >
        {i18n.t('mental-health-playback.rating.feedback')}
      </Text>
      <TextareaWithCharCount
        onChangeText={setComments}
        style={styling.marginBottomAuto}
        textAreaStyle={styling.textarea}
        value={comments}
      />
    </Screen>
  );
}
