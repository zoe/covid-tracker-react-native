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
import DropdownField from '@covid/components/DropdownField';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'JoinNetworkGroup'>;
  route: RouteProp<ScreenParamList, 'JoinNetworkGroup'>;
};

enum InputMode {
  input,
  dropdown,
}

export const JoinNetworkGroupScreen: React.FC<Props> = ({ route, navigation, ...props }) => {
  const inputMode: InputMode = InputMode.dropdown;
  const enableCreateGroup: boolean = false;

  const create = () => {
    schoolNetworkCoordinator.goToCreateSchoolGroup();
  };

  const next = () => {
    schoolNetworkCoordinator.goToSchoolNetworkSuccess();
  };

  return (
    <View style={styles.root}>
      <Screen style={styles.root}>
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
                    {inputMode === InputMode.input && (
                      <GenericTextField
                        formikProps={formikProps}
                        placeholder="Find a class or bubble"
                        label="Join existing groups"
                        name="groupName"
                        showError
                      />
                    )}
                    {inputMode === InputMode.dropdown && (
                      <DropdownField
                        label="Join existing groups"
                        // selectedValue={props.values.treatedPatientsWithCovid}
                        // onValueChange={props.handleChange('treatedPatientsWithCovid')}
                        // label={i18n.t('health-worker-exposure-question-treated-patients-with-covid')}
                        // items={patientInteractionOptions}
                      />
                    )}
                    {enableCreateGroup && (
                      <Button onPress={create} outline>
                        Create a new group
                      </Button>
                    )}
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
