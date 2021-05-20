import lodash from 'lodash';
import React, { useState } from 'react';
import { LayoutChangeEvent, TouchableOpacity, View } from 'react-native';
import { Textarea } from 'native-base';

import NavigatorService from '@covid/NavigatorService';
import { BasicPage, Text } from '@covid/components';
import { homeScreenName } from '@covid/core/localisation/LocalisationService';
import Card from '@covid/components/Cards/Card';
import i18n from '@covid/locale/i18n';
import { grid, styling } from '@covid/themes';
import Star from '@assets/mental-health-playback/Star';
import { mentalHealthApiClient } from '@covid/Services';

const AMOUNT_STARS = 5;
const THROTTLE_TIME = 250; // Milliseconds

const ratings = Array(AMOUNT_STARS)
  .fill(null)
  .map((_, i) => i);

const throttledFunction = lodash.throttle((func) => func(), THROTTLE_TIME);

export default function MHPRatingScreen() {
  const [cardWidth, setCardWidth] = useState(0);
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  const starSize = cardWidth / (AMOUNT_STARS * 2);
  const spacingSize = starSize / 2;

  async function onPress() {
    if (!loading) {
      setLoading(true);
      const result = await mentalHealthApiClient.feedback(selectedRating, comments);
      setLoading(false);
      if (result) {
        NavigatorService.reset([{ name: homeScreenName() }, { name: 'MentalHealthPlaybackThankYou' }]);
      }
    }
  }

  function onLayout(event: LayoutChangeEvent) {
    setCardWidth(event.nativeEvent.layout.width);
  }

  return (
    <BasicPage
      hasStickyHeader
      active={selectedRating > 0}
      footerTitle={i18n.t('mental-health-playback.rating.button')}
      loading={loading}
      onPress={() => throttledFunction(onPress)}
      style={styling.backgroundWhite}
      withGutter>
      <Card padding={grid.xxxl} style={[styling.marginTop, styling.marginBottomHuge]} useShadow>
        <View style={styling.measureWidth} onLayout={onLayout} />
        <Text
          inverted
          colorPalette="accentBlue"
          colorShade="main"
          style={styling.marginBottomBig}
          textAlign="center"
          textClass="h3Regular">
          {i18n.t('mental-health-playback.rating.card')}
        </Text>
        <View style={styling.row}>
          {ratings.map((rating) => (
            <TouchableOpacity
              key={`touchable-star-${rating}`}
              onPress={() => setSelectedRating(rating + 1)}
              style={{
                paddingHorizontal: spacingSize,
                paddingVertical: grid.xl,
              }}>
              <Star color={selectedRating - 1 >= rating ? '#0165B5' : '#E2E2E2'} height={starSize} width={starSize} />
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
        style={styling.marginBottom}
        textAlign="center"
        inverted
        colorPalette="accentBlue"
        colorShade="main"
        textClass="p">
        {i18n.t('mental-health-playback.rating.feedback')}
      </Text>
      <Textarea
        bordered={false}
        style={[styling.textarea, styling.marginBottomAuto]}
        rowSpan={5}
        value={comments}
        onChangeText={setComments}
        underline={false}
      />
    </BasicPage>
  );
}
