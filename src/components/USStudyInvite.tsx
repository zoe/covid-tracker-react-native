import React, { Component } from 'react';
import { Image, Modal, TouchableOpacity, View, StyleSheet, ImageBackground } from 'react-native';

import { closeIcon, blobs } from '@assets';
import { RegularText, HeaderText } from '@covid/components/Text';
import { colors, fontStyles } from '@theme';
import { AssessmentData } from '@covid/features/assessment/AssessmentCoordinator';
import { isUSCountry } from '@covid/core/user/UserService';
import i18n from '@covid/locale/i18n';
import { userService } from '@covid/Services';

import { BrandedButton } from './BrandedButton';

type State = {
  isModalOpen: boolean;
};

type Props = {
  assessmentData: AssessmentData;
};

const initialState = {
  isModalOpen: false,
};

export class USStudyInvite extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const { currentPatient } = this.props.assessmentData;
    if (isUSCountry() && !currentPatient.isReportedByAnother && currentPatient.shouldShowUSStudyInvite) {
      this.setState({ isModalOpen: true });
    }
  }

  handleAgree = () => {
    this.setState({ isModalOpen: false });
    userService.setUSStudyInviteResponse(this.props.assessmentData.currentPatient.patientId, true);
  };

  handleClose = () => {
    this.setState({ isModalOpen: false });
    userService.setUSStudyInviteResponse(this.props.assessmentData.currentPatient.patientId, false);
  };

  render() {
    const isModal = true;
    const backgroundStyle = isModal ? styles.centeredView : styles.endView;
    const containerStyle = [isModal ? styles.modalView : styles.popUpView, styles.shadow];
    const buttonStyle = isModal ? styles.modalButton : styles.popUpButton;
    const imageStyle = isModal ? { borderRadius: 16 } : {};
    // const backgroundImage = isModal ? modalBackground : popUpBackground;

    return (
      this.state.isModalOpen && (
        <Modal animationType="fade" transparent>
          <View style={backgroundStyle}>
            <View style={containerStyle}>
              <ImageBackground source={blobs} style={{}} imageStyle={[styles.backgroundImage, imageStyle]}>
                <View style={styles.contentContainer}>
                  <TouchableOpacity onPress={this.handleClose} style={{ alignSelf: 'flex-end' }}>
                    <Image source={closeIcon} />
                  </TouchableOpacity>
                  <HeaderText style={styles.title}>{i18n.t('us-study-invite.title')}</HeaderText>
                  <RegularText style={styles.body}>{i18n.t('us-study-invite.body')}</RegularText>
                  <BrandedButton style={buttonStyle} onPress={this.handleAgree}>
                    <RegularText style={styles.buttonText}>{i18n.t('us-study-invite.button')}</RegularText>
                  </BrandedButton>
                </View>
              </ImageBackground>
            </View>
          </View>
        </Modal>
      )
    );
  }
}

const styles = StyleSheet.create({
  title: {
    paddingVertical: 0,
    paddingHorizontal: 32,
    fontSize: 20,
    color: '#24262B',
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
  endView: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 24,
  },
  popUpView: {
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  modalView: {
    margin: 24,
    backgroundColor: colors.white,
    borderRadius: 16,
    alignItems: 'center',
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    height: 40,
    marginBottom: 16,
    marginHorizontal: 75,
    backgroundColor: colors.purple,
  },
  popUpButton: {
    marginBottom: 16,
    backgroundColor: colors.purple,
  },
  buttonText: {
    ...fontStyles.bodySmallLight,
    color: colors.white,
  },
});
