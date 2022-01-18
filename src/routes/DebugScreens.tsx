import * as screens from '@covid/features/screens';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const screenEntries = Object.entries(screens);

const TIME_INTERVAL_MS = 2000;

export default function DebugScreens(props: any) {
  const [runSlideshow, setRunSlideshow] = React.useState(false);
  const [index, setIndex] = React.useState(16);
  const [showInfo, setShowInfo] = React.useState(true);

  /* Uncomment below to let the app go through all screens like a slideshow. */
  React.useEffect(() => {
    if (!runSlideshow) {
      return undefined;
    }
    setShowInfo(false);
    const interval = setInterval(() => {
      setIndex((previousIndex) => {
        if (previousIndex >= screenEntries.length - 1) {
          setRunSlideshow(false);
          setShowInfo(true);
          clearInterval(interval);
          return 0;
        }
        return previousIndex + 1;
      });
    }, TIME_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [runSlideshow]);

  if (!__DEV__) {
    return null;
  }

  function onLongPress() {
    setShowInfo((previousShowInfo) => !previousShowInfo);
  }
  function onPressPrevious() {
    setIndex((previousIndex) => (previousIndex === 0 ? screenEntries.length - 1 : previousIndex - 1));
  }
  function onPressNext() {
    setIndex((previousIndex) => (previousIndex === screenEntries.length - 1 ? 0 : previousIndex + 1));
  }

  const Screen = screenEntries[index][1];

  const textStyle = showInfo ? styles.text : styles.textHidden;

  return (
    <>
      <Screen {...props} />
      <View pointerEvents="box-none" style={styles.view}>
        <TouchableOpacity onLongPress={onLongPress} style={styles.touchableOpacity}>
          <TouchableOpacity onPress={onPressPrevious} style={styles.textWrapper}>
            <Text style={textStyle}>{'<'}</Text>
          </TouchableOpacity>
          <View style={styles.textWrapper}>
            <Text style={textStyle}>{index}</Text>
            <Text style={textStyle}>{screenEntries[index][0]}</Text>
          </View>
          <TouchableOpacity onPress={onPressNext} style={styles.textWrapper}>
            <Text style={textStyle}>{'>'}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'red',
    textAlign: 'center',
  },
  textHidden: {
    color: 'red',
    display: 'none',
    textAlign: 'center',
  },
  textWrapper: {
    alignItems: 'center',
    aspectRatio: 1,
    flex: 1,
    justifyContent: 'center',
    zIndex: 1000,
  },
  touchableOpacity: {
    flexDirection: 'row',
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  view: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
