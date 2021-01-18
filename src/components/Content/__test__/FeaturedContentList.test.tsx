import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';

import { container } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import ApiClient from '@covid/core/api/ApiClient';
import { fetchFeaturedContent } from '@covid/core/content/state/contentSlice';
import { FeaturedContentList, FeaturedContentType } from '@covid/components/Content/FeaturedContentList';
import FeaturedContentJson from '@covid/components/Content/__mock__/featured-content.json';

jest.useFakeTimers();

// Mock Redux store
const mockReduxStore = (state: any) => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore(state);
  return store;
};

const mockNetworkResponse = () => {
  const api = container.get<ApiClient>(Services.Api);
  const client = api.getClient();
  // Mock
  const mock = new MockAdapter(client);
  mock.onGet('/content/').reply(200, FeaturedContentJson);
};

describe('FeaturedContentList tests', () => {
  beforeAll(() => {
    mockNetworkResponse();
  }),
    it('renders home screen featured content correctly', async () => {
      // Test Redux action
      // Unable to type but should be AsyncThunk<Partial<ContentState>, any, any>;
      const testActionStore = mockReduxStore({});
      const result = await testActionStore.dispatch<any>(fetchFeaturedContent());
      const content = result.payload.featuredHome;

      expect(result.type).toBe('content/featured_content/fulfilled');
      expect(content.length).toBe(2);

      const testContentStore = mockReduxStore({
        content: {
          dismissedCallouts: [],
          featuredHome: content,
        },
      });

      // Test rendering
      const instance = renderer.create(
        <Provider store={testContentStore}>
          <FeaturedContentList type={FeaturedContentType.Home} screenName="Screen name" disableLoadingState />
        </Provider>
      );

      expect(
        instance.root.findAll((el) => {
          return el.props?.testID === 'featured-content-callout' && (el.type as any) === 'View';
        }).length
      ).toBe(content.length);
    });

  it('renders home screen featured content correctly', async () => {
    // Test Redux action
    // Unable to type but should be AsyncThunk<Partial<ContentState>, any, any>;
    const testActionStore = mockReduxStore({});
    const result = await testActionStore.dispatch<any>(fetchFeaturedContent());
    const content = result.payload.featuredThankyou;

    expect(result.type).toBe('content/featured_content/fulfilled');
    expect(content.length).toBe(4);

    const testContentStore = mockReduxStore({
      content: {
        dismissedCallouts: [],
        featuredThankyou: content,
      },
    });

    // Test rendering
    const instance = renderer.create(
      <Provider store={testContentStore}>
        <FeaturedContentList type={FeaturedContentType.ThankYou} screenName="Screen name" disableLoadingState />
      </Provider>
    );

    expect(
      instance.root.findAll((el) => {
        return el.props?.testID === 'featured-content-callout' && (el.type as any) === 'View';
      }).length
    ).toBe(content.length);
  });
});
