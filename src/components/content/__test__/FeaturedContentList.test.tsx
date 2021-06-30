import FeaturedContentJson from '@covid/components/Content/__mock__/featured-content.json';
import { FeaturedContentList, FeaturedContentType } from '@covid/components/Content/FeaturedContentList';
import ApiClient from '@covid/core/api/ApiClient';
import { fetchFeaturedContent } from '@covid/core/content/state/contentSlice';
import MockAdapter from 'axios-mock-adapter';
import * as React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockReduxStore = (state: any) => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore(state);
  return store;
};

const apiClient = new ApiClient();

const mockNetworkResponse = () => {
  const mock = new MockAdapter(apiClient.getClient());
  mock.onGet('/content/').reply(200, FeaturedContentJson);
};

describe('FeaturedContentList tests', () => {
  beforeAll(() => {
    mockNetworkResponse();
  });

  it('renders home screen featured content correctly', async () => {
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

    const instance = renderer.create(
      <Provider store={testContentStore}>
        <FeaturedContentList disableLoadingState screenName="Screen name" type={FeaturedContentType.Home} />
      </Provider>,
    );

    expect(
      instance.root.findAll((el) => {
        return el.props?.testID === 'featured-content-callout' && (el.type as any) === 'View';
      }).length,
    ).toBe(content.length);
  });

  it('renders home screen featured content correctly', async () => {
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

    const instance = renderer.create(
      <Provider store={testContentStore}>
        <FeaturedContentList disableLoadingState screenName="Screen name" type={FeaturedContentType.ThankYou} />
      </Provider>,
    );

    expect(
      instance.root.findAll((el) => {
        return el.props?.testID === 'featured-content-callout' && (el.type as any) === 'View';
      }).length,
    ).toBe(content.length);
  });
});
