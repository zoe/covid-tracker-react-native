import React, { Component } from 'react';
import { Image, Modal, TouchableOpacity, View, StyleSheet, ImageBackground } from 'react-native';

import { closeIcon, blobs } from '@assets';
import { RegularText, RegularBoldText, HeaderText } from '@covid/components/Text';
import { colors, fontStyles } from '@theme';
import { userService } from '@covid/Services';

import { BrandedButton } from './BrandedButton';

type State = {
  isModalOpen: boolean;
};

const initialState = {
  isModalOpen: true,
};

export class USStudyInvite extends Component<object, State> {
  constructor(props: any) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    console.log(await userService.shouldAskForUSAdditionalStudies(false));
  }

  handleAgree = () => {
    this.setState({ isModalOpen: false });
  };

  handleClose = () => {
    this.setState({ isModalOpen: false });
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
                  <HeaderText style={styles.title}>{'New COVID Studies \n& how you can help'} </HeaderText>
                  <RegularText style={styles.body}>
                    Are you interested in being contacted to learn about additional studies related to COVID-19 or use
                    of this app?
                  </RegularText>
                  <BrandedButton style={buttonStyle} onPress={this.handleAgree}>
                    <RegularText style={styles.buttonText}>I am interested</RegularText>
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
