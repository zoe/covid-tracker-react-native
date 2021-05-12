import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

export const EstimatedCasesCartoMap = require('@assets/carto/estimated-cases.html');
export const TrendLineOverview = require('@assets/charts/trendline-overview.html');
export const TrendLineExplore = require('@assets/charts/trendline-explore.html');

export const loadHTMLAsString = async (asset: number | string): Promise<string> => {
  const file = Asset.fromModule(asset);
  await file.downloadAsync();
  if (!file.localUri) {
    throw new Error('Local file uri not found for given asset');
  }
  return FileSystem.readAsStringAsync(file.localUri);
};

//
// This is required for Android. Because the following didn't work,
// causes 'sources not defined.' on webview.
// <Webview source{require('file.html')} />
//
// With this we can use html in Webview, like the following example
// <Webview source{{ html: loadEstimatedCasesCartoMap() }} />
// (Not the best example as this method is async).

export const loadEstimatedCasesCartoMap = async (): Promise<string> => loadHTMLAsString(EstimatedCasesCartoMap);
export const loadTrendLineOverview = async (): Promise<string> => loadHTMLAsString(TrendLineOverview);
export const loadTrendLineExplore = async (): Promise<string> => loadHTMLAsString(TrendLineExplore);
