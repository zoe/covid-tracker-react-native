import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import { MutedText, RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { useAppDispatch } from '@covid/core/state/store';
import { searchTrendLine } from '@covid/core/content/state/contentSlice';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { IContentService } from '@covid/core/content/ContentService';
import { Services } from '@covid/provider/services.types';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { BackButton } from '@covid/components/PatientHeader';
import { LADSearchResult } from '@covid/core/content/dto/ContentAPIContracts';
import { useInjection } from '@covid/provider/services.hooks';
import NavigatorService from '@covid/NavigatorService';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'SearchLAD'>;
  route: RouteProp<ScreenParamList, 'SearchLAD'>;
};

export const SearchLADScreen: React.FC<RenderProps> = (props) => {
  const [result, setResult] = useState<LADSearchResult[]>([]);
  const contentService = useInjection<IContentService>(Services.Content);
  const dispatch = useAppDispatch();
  const [searchRequestFn, setSearchRequestFn] = useState<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    search('');
  }, []);

  const renderItem: React.FC<{ item: LADSearchResult }> = ({ item }) => (
    <TouchableOpacity onPress={() => onItemSelected(item)}>
      <View style={styles.item}>
        <RegularText>{item.name}</RegularText>
      </View>
    </TouchableOpacity>
  );

  const onItemSelected = (item: LADSearchResult) => {
    dispatch(searchTrendLine(item.lad));
    NavigatorService.goBack();
  };

  const search = async (query: string) => {
    if (searchRequestFn) {
      clearInterval(searchRequestFn);
    }
    setSearchRequestFn(
      setTimeout(async () => {
        const data = await contentService.searchLAD(query, 1, 20);
        setResult(data.results);
      }, 500)
    );
  };

  return (
    <View style={{ paddingTop: 64, paddingHorizontal: 20, flex: 1, backgroundColor: 'white' }}>
      <BackButton navigation={props.navigation} />
      <View style={styles.searchField}>
        <RegularText>{i18n.t('search-lad.input-label')}</RegularText>
        <ValidatedTextInput
          placeholder={i18n.t('search-lad.input-placeholder')}
          onChangeText={(value) => search(value)}
          returnKeyType="next"
          onSubmitEditing={() => {}}
        />
      </View>

      {!result ||
        (result && result.length === 0 && (
          <MutedText style={styles.noResult}>{i18n.t('search-lad.no-result')}</MutedText>
        ))}
      <FlatList style={styles.list} data={result} renderItem={renderItem} keyExtractor={(item) => item.lad} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchField: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  list: {
    marginTop: 16,
  },
  item: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
  },
  title: {
    fontSize: 32,
  },
  noResult: {
    textAlign: 'center',
    marginTop: 64,
  },
});
