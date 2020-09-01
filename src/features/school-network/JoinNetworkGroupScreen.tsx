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
  navigation: StackNavigationProp<ScreenParamList, 'JoinNetworkGroup'>;
  route: RouteProp<ScreenParamList, 'JoinNetworkGroup'>;
};

export const JoinNetworkGroupScreen: React.FC<Props> = ({ route, navigation, ...props }) => {
  const create = () => {
    schoolNetworkCoordinator.goToCreateSchoolGroup();
  };

  const next = () => {};
  return (
    <Screen>
      <Header>
        <HeaderText>Join a group in this network</HeaderText>
        <RegularText style={styles.topText}>
          Join a class or bubble at “Queen Elizabeth High School”. If you don’t see your child’s class or bubble, you
          can create a new group.
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
                    placeholder="Find a class or bubble"
                    label="Join existing groups"
                    name="groupName"
                    showError
                  />
                  <Button onPress={create} outline>
                    Create a new group
                  </Button>
                </View>
                <View>
                  <View style={{ height: 48 }} />
                  <Button onPress={next} branded>
                    Next
                  </Button>
                </View>
              </View>
            </Form>
          );
        }}
      </Formik>
    </Screen>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    height: '96%',
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
