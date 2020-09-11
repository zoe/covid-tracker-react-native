import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import { Form } from 'native-base';

import { colors } from '@theme';
import { HeaderText, RegularText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { GenericTextField } from '@covid/components/GenericTextField';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { Button } from '@covid/components/Buttons/Button';
import schoolNetworkCoordinator from '@covid/features/school-network/SchoolNetworkCoordinator';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'CreateNetworkGroup'>;
  route: RouteProp<ScreenParamList, 'CreateNetworkGroup'>;
};

export const CreateNetworkGroupScreen: React.FC<Props> = ({ route, navigation, ...props }) => {
  const create = () => {};
  const next = () => {
    schoolNetworkCoordinator.gotoNextScreen(route.name);
  };
  return (
    <View style={styles.root}>
      <Screen style={styles.root}>
        <Header>
          <HeaderText>Create a new group</HeaderText>
          <RegularText style={styles.topText}>
            Create a new group within the school that will be easily recognisable for others such as “Class 2A” or “Year
            6”.
          </RegularText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={3} maxSteps={3} color={colors.brand} />
        </ProgressBlock>

        <Formik initialValues={{}} onSubmit={(values: any) => {}}>
          {(formikProps) => {
            return (
              <Form>
                <View style={styles.formContainer}>
                  <View>
                    <View style={{ height: 16 }} />
                    <GenericTextField
                      formikProps={formikProps}
                      placeholder="Enter group name (e.g. Class 2A)"
                      label="Group name"
                      name="groupName"
                      showError
                    />
                  </View>
                </View>
              </Form>
            );
          }}
        </Formik>
      </Screen>
      <View>
        <View style={{ height: 48 }} />
        <Button onPress={next} branded>
          Next
        </Button>
        <View style={{ height: 32 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.white,
  },
  formContainer: {
    height: '100%',
    justifyContent: 'space-between',
  },
  topText: {
    marginTop: 16,
  },
  primaryButton: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: colors.brand,
  },
  primaryButtonText: {
    color: colors.white,
  },
});
