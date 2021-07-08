import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Keep in mind that certain styling properties don't work on the SafeAreaView.
// For example setting a padding is ignored.

interface IProps {
  children?: React.ReactNode;
  testID: string;
}

export default function Page(props: IProps) {
  return (
    <SafeAreaView style={styles.flex} testID={props.testID}>
      <ScrollView contentContainerStyle={styles.flexGrow}>
        {props.children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    backgroundColor: 'red',
    flex: 1,
    padding: 20,
  },
  flexGrow: {
    backgroundColor: 'blue',
    flexGrow: 1,
  },
});
