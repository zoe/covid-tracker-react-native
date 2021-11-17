import Analytics from '@covid/core/Analytics';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';

type TWrapperProps = {
  children?: React.ReactNode;
  disabled?: boolean;
  onPress?: () => void;
};

type TProps = TWrapperProps & {
  eventName: string;
  properties?: object;
};

export function withAnalytics<TComponentProps>(WrappedComponent: React.ComponentType<TWrapperProps & TComponentProps>) {
  return function WithAnalytics({ children, eventName, properties, onPress, ...props }: TProps & TComponentProps) {
    const wrappedOnPress = React.useCallback(() => {
      Analytics.track(eventName, properties);
      if (onPress) {
        onPress();
      }
    }, [eventName, properties, onPress]);
    const wrappedOnPressDisabled = React.useCallback(() => {
      Analytics.track(eventName, {
        disabled: true,
        ...(properties || {}),
      });
    }, [eventName, properties]);
    if (props.disabled === true) {
      // Don't use the TouchableWithoutFeedback component as it somehow doesn't work in this setup.
      return (
        <TouchableOpacity accessible={false} activeOpacity={1} onPress={wrappedOnPressDisabled}>
          {/* @ts-expect-error */}
          <WrappedComponent {...props} onPress={onPress}>
            {children}
          </WrappedComponent>
        </TouchableOpacity>
      );
    }
    return (
      // @ts-expect-error
      <WrappedComponent {...props} onPress={wrappedOnPress}>
        {children}
      </WrappedComponent>
    );
  };
}
