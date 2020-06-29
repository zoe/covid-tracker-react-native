import React, { useEffect, useState } from 'react';
import { Image, Modal, TouchableOpacity, View, StyleSheet, ImageBackground, ScrollView } from 'react-native';

import { closeIcon, blobs } from '@assets';
import { RegularText, HeaderText } from '@covid/components/Text';
import { colors, fontStyles } from '@theme';
import { AssessmentData } from '@covid/core/assessment/AssessmentCoordinator';
import { isUSCountry, ICoreService } from '@covid/core/user/UserService';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import i18n from '@covid/locale/i18n';
import Analytics, { events } from '@covid/core/Analytics';

import { BrandedButton } from './BrandedButton';

type StudyInviteProps = {
  assessmentData: AssessmentData;
};

export const USStudyInvite: React.FC<StudyInviteProps> = (props: StudyInviteProps) => {
  const userService = useInjection<ICoreService>(Services.User);
  const [modalVisible, setModalVisible] = useState(false);
  const { currentPatient } = props.assessmentData;

  useEffect(() => {
    if (isUSCountry() && !currentPatient.isReportedByAnother && currentPatient.shouldShowUSStudyInvite) {
      setModalVisible(true);
    }
  }, [props.assessmentData]);

  const handleAgree = () => {
    setModalVisible(false);
    Analytics.track(events.ACCEPT_STUDY_CONTACT);
    userService.setUSStudyInviteResponse(props.assessmentData.currentPatient.patientId, true);
    currentPatient.shouldShowUSStudyInvite = false;
  };

  const handleClose = () => {
    setModalVisible(false);
    Analytics.track(events.DECLINE_STUDY_CONTACT);
    userService.setUSStudyInviteResponse(props.assessmentData.currentPatient.patientId, false);
    currentPatient.shouldShowUSStudyInvite = false;
  };

  return (
    <>
      {modalVisible && (
        <Modal animationType="fade" transparent>
          <View style={styles.outsideView}>
            <View style={styles.modalView}>
              <ImageBackground source={blobs} style={{}} imageStyle={[styles.backgroundImage, { borderRadius: 16 }]}>
                <View style={styles.contentContainer}>
                  <TouchableOpacity onPress={handleClose} style={{ alignSelf: 'flex-end' }}>
                    <Image style={{ height: 24, width: 24 }} source={closeIcon} />
                  </TouchableOpacity>
                  <ScrollView>
                    <HeaderText style={styles.title}>{i18n.t('us-study-invite.title')}</HeaderText>
                    <RegularText style={styles.body}>{i18n.t('us-study-invite.body')}</RegularText>
                  </ScrollView>

                  <BrandedButton style={styles.modalButton} onPress={handleAgree}>
                    <RegularText style={styles.buttonText}>{i18n.t('us-study-invite.button')}</RegularText>
                  </BrandedButton>
                </View>
              </ImageBackground>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingVertical: 0,
    paddingHorizontal: 32,
    fontSize: 20,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'center',
  },
  body: {
    paddingTop: 12,
    paddingBottom: 32,
    marginHorizontal: 30,
    fontSize: 14,
    textAlign: 'center',
  },
  backgroundImage: {
    height: '50%',
    resizeMode: 'stretch',
  },
  outsideView: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 24,
  },
  modalView: {
    maxHeight: '40%',
    margin: 24,
    backgroundColor: colors.white,
    borderRadius: 16,
    alignItems: 'center',
  },
  modalButton: {
    width: '60%',
    height: 40,
    marginBottom: 16,
    backgroundColor: colors.purple,
    alignSelf: 'center',
  },
  buttonText: {
    ...fontStyles.bodySmallLight,
    color: colors.white,
  },
});
