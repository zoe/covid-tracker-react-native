import React, { useEffect, useState } from 'react';
import { Image, Modal, TouchableOpacity, View, StyleSheet, ImageBackground } from 'react-native';

import { closeIcon, blobs } from '@assets';
import { RegularText, HeaderText } from '@covid/components/Text';
import { colors, fontStyles } from '@theme';
import { AssessmentData } from '@covid/features/assessment/AssessmentCoordinator';
import { isUSCountry } from '@covid/core/user/UserService';
import i18n from '@covid/locale/i18n';
import { userService } from '@covid/Services';
import Analytics, { events } from '@covid/core/Analytics';

import { BrandedButton } from './BrandedButton';

type StudyInviteProps = {
  assessmentData: AssessmentData;
};

export const USStudyInvite: React.FC<StudyInviteProps> = (props: StudyInviteProps) => {
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
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ImageBackground source={blobs} style={{}} imageStyle={[styles.backgroundImage, { borderRadius: 16 }]}>
                <View style={styles.contentContainer}>
                  <TouchableOpacity onPress={handleClose} style={{ alignSelf: 'flex-end' }}>
                    <Image source={closeIcon} />
                  </TouchableOpacity>
                  <HeaderText style={styles.title}>{i18n.t('us-study-invite.title')}</HeaderText>
                  <RegularText style={styles.body}>{i18n.t('us-study-invite.body')}</RegularText>
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
    bottom: 145,
    resizeMode: 'cover',
  },
  centeredView: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 24,
  },
  modalView: {
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
