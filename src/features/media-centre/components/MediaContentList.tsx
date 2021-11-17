import { Tag, Text } from '@covid/components';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { searchContentItems, selectEnabledTags } from '@covid/core/state/media-centre';
import { TMediaContentItem } from '@covid/core/state/media-centre/types';
import { TRootState } from '@covid/core/state/root';
import { MediaContentItem } from '@covid/features/media-centre/components/MediaContentItem';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

interface IProps {
  enableSearch?: boolean;
}

function keyExtractor(mediaItem: TMediaContentItem) {
  return `media-content-item-${mediaItem.id}`;
}

function renderItem({ item }: { item: TMediaContentItem }) {
  return <MediaContentItem item={item} key={keyExtractor(item)} testID={keyExtractor(item)} />;
}

export function MediaContentList(props: IProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const searchedItems = useSelector((state: TRootState) => searchContentItems(state, searchQuery));
  const enabledTags = useSelector((state: TRootState) => selectEnabledTags(state, searchQuery));

  return (
    <>
      {props.enableSearch ? (
        <ValidatedTextInput
          onChangeText={setSearchQuery}
          placeholder={i18n.t('media-centre.search-placeholder')}
          value={searchQuery}
        />
      ) : null}
      {searchQuery ? (
        <Text style={styles.marginVertical} textClass="h5">
          {i18n.t('media-centre.results')} ({searchedItems.length})
        </Text>
      ) : null}
      {props.enableSearch ? (
        <View style={styles.flexRow}>
          {enabledTags.map((tag) => (
            <Tag color={colors.tertiary} style={styles.marginRight} text={tag} />
          ))}
        </View>
      ) : null}
      <FlatList
        nestedScrollEnabled
        scrollEnabled
        contentContainerStyle={styles.contentContainer}
        data={searchedItems}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: colors.backgroundPrimary,
  },
  flexRow: {
    flexDirection: 'row',
  },
  marginRight: {
    marginRight: sizes.s,
  },
  marginVertical: {
    marginBottom: sizes.s,
    marginTop: sizes.s,
  },
});
