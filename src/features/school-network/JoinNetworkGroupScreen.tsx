import React, { useEffect, useState } from 'react';
import { PickerItemProps, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import { Form } from 'native-base';

import { colors } from '@theme';
import { HeaderText, RegularText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { Button } from '@covid/components/Buttons/Button';
import schoolNetworkCoordinator from '@covid/features/school-network/SchoolNetworkCoordinator';
import DropdownField from '@covid/components/DropdownField';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'JoinNetworkGroup'>;
  route: RouteProp<ScreenParamList, 'JoinNetworkGroup'>;
};

type JoinGroupData = {
  groupId: string;
};

export const JoinNetworkGroupScreen: React.FC<Props> = ({ route, navigation, ...props }) => {
  const create = () => {
    schoolNetworkCoordinator.goToCreateSchoolGroup();
  };

  const next = () => {};

  const [groupList, setGroupList] = useState<PickerItemProps[]>([]);

  const schoolId = '123'; //TODO Get from previous screen

  useEffect(() => {
    schoolNetworkCoordinator.getGroupsList(schoolId).then((schools) => {
      const pickerItems = schools.map<PickerItemProps>((g) => {
        return {
          label: g.name,
          value: g.id,
        };
      });
      setGroupList(pickerItems);
    });
  }, []);

  const setGroupData = (schoolData: JoinGroupData) => {
    schoolNetworkCoordinator.setGroup(schoolData.groupId);
  };

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

      <Formik
        initialValues={
          {
            groupId: '',
          } as JoinGroupData
        }
        onSubmit={(values: JoinGroupData) => {
          return setGroupData(values);
        }}>
        {(formikProps) => {
          return (
            <Form style={styles.formContainer}>
              <View>
                {/*<GenericTextField*/}
                {/*  formikProps={formikProps}*/}
                {/*  placeholder="Find a class or bubble"*/}
                {/*  label="Join existing groups"*/}
                {/*  name="groupName"*/}
                {/*  showError*/}
                {/*/>*/}

                <DropdownField
                  selectedValue={formikProps.values.groupId}
                  onValueChange={formikProps.handleChange('groupId')}
                  label="Select group from below"
                  items={groupList}
                  error={formikProps.touched.groupId && formikProps.errors.groupId}
                />
                <Button onPress={create} outline>
                  Create a new group
                </Button>
              </View>

              <Button onPress={next} branded>
                Next
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Screen>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flexGrow: 1,
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
