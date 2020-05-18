import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';

import { colors } from '../../../../theme';
import { CheckboxItem, CheckboxList } from '../../../components/Checkbox';
import { BrandedButton, ClickableText, RegularBoldText, RegularText } from '../../../components/Text';
import UserService from '../../../core/user/UserService';
import { ScreenParamList } from '../../ScreenParamList';
import { NursesConsentVersionUS, privacyPolicyVersionUS } from '../constants';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'NursesConsentUS'>;
  route: RouteProp<ScreenParamList, 'NursesConsentUS'>;
};

interface TermsState {
  processingChecked: boolean;
  termsOfUseChecked: boolean;
}

export class NursesConsentUSScreen extends Component<PropsType, TermsState> {
  private userService = new UserService();

  constructor(props: PropsType) {
    super(props);
    this.state = {
      processingChecked: false,
      termsOfUseChecked: false,
    };
  }

  viewOnly = this.props.route.params.viewOnly;

  handleProcessingChange = () => {
    this.setState({ processingChecked: !this.state.processingChecked });
  };

  handleTermsOfUseChange = () => {
    this.setState({ termsOfUseChecked: !this.state.termsOfUseChecked });
  };

  handleAgreeClicked = async () => {
    if (this.state.processingChecked && this.state.termsOfUseChecked) {
      await this.userService.setConsentSigned('US Nurses', NursesConsentVersionUS, privacyPolicyVersionUS);
      this.props.navigation.navigate('Register');
    }
  };

  render() {
    return (
      <View style={styles.rootContainer}>
        <ScrollView>
          <RegularBoldText>RESEARCH STUDY/HEALTHCARE WORKER INFORMED CONSENT{'\n'}</RegularBoldText>
          <RegularText>
            This research consent form has been approved by the Institutional Review Board at Massachusetts General
            Hospital (Partners Human Research Committee Protocol #2020P000909 Version Date: 3/31/2020){'\n'}
          </RegularText>
          <RegularBoldText>About this consent form{'\n'}</RegularBoldText>
          <RegularText>
            Please read this form carefully. It tells you important information about a research study.
            {'\n\n'}
            If you have any questions about the research or about this form, please ask. Taking part in this research
            study is up to you.
            {'\n'}
          </RegularText>

          <RegularBoldText>Why is this research study being done?{'\n'}</RegularBoldText>
          <RegularText>
            We are doing this research to determine health and lifestyle factors related to the symptoms and outcomes
            associated with the Coronavirus (COVID-19). By using this app that consists of a series of questions meant
            to collect data on whether you are well or have symptoms, you will be helping medical science and healthcare
            providers across the country to better understand this disease. This app is designed to be a tool for data
            collection and to help medical professionals and researchers understand this disease. It does not give
            health advice. The Centers for Disease Control and Prevention has publicly-accessible information related to
            COVID-19 that can be found at:{' '}
            <ClickableText onPress={() => this.openUrl('https://www.cdc.gov/coronavirus/2019-ncov/index.html')}>
              https://www.cdc.gov/coronavirus/2019-ncov/index.html
            </ClickableText>
            .{'\n'}
          </RegularText>

          <RegularBoldText>How long will I take part in this research study?{'\n'}</RegularBoldText>
          <RegularText>
            Your use of this mobile application is completely voluntary. You can use it as little or as much as you
            would like and can stop using it at any time. We find that answering the series of questions takes a matter
            of minutes (no more than 10 minutes on average).
            {'\n'}
          </RegularText>

          <RegularBoldText>What will happen in this research study?{'\n'}</RegularBoldText>

          <RegularText>
            We will ask you a series of questions related to your occupation, your possible affiliation with certain
            ongoing studies or research centers, basic personal characteristics (gender/age), your health status, any
            medications you are using, how you are feeling, what symptoms you might be experiencing, and what, if any,
            treatments you’ve received either in outpatient or in-hospital settings. We will also ask you about what the
            outcome of any of those treatments. All questions are optional and you need not answer any questions you are
            uncomfortable answering.
            {'\n'}
          </RegularText>

          <RegularBoldText>
            What are the risks and possible discomforts from being in this research study?{'\n'}
          </RegularBoldText>

          <RegularText>
            We don’t expect you to experience any risks or possible discomforts associated with being in this study.
            Some people may not feel comfortable answering some of the questions asked, but no question is required to
            be answered. While necessary security precautions have been taken, there is a minor risk as there is with
            all digital data that information shared with us may be inadvertently accessed by others not identified in
            this consent form.
            {'\n'}
          </RegularText>

          <RegularBoldText>What are the possible benefits from being in this research study?{'\n'}</RegularBoldText>
          <RegularText>
            There are no direct benefits to you for taking part in this study. Your participation may contribute more
            widely, with all the other participants to the advancement of research into the COVID virus.
            {'\n'}
          </RegularText>

          <RegularBoldText>
            Can I still get medical care within hospitals affiliated with the research in this study, or if I stop
            taking part?{'\n'}
          </RegularBoldText>
          <RegularText>
            Yes. Your decision won’t change the medical care you get within affiliated hospitals now or in the future.
            There will be no penalty, and you won’t lose any benefits you receive now or have a right to receive. Taking
            part in this research study is up to you. You can decide not to take part. If you decide to take part now,
            you can change your mind and drop out later.
            {'\n'}
          </RegularText>

          <RegularBoldText>What should I do if I want to stop taking part in the study?{'\n'}</RegularBoldText>

          <RegularText>
            If you take part in this research study, and want to drop out, you should tell us. You may withdraw your
            consent at any time by emailing{' '}
            <ClickableText onPress={() => this.openUrl('mailto:leavecovidtracking-us@joinzoe.com')}>
              leavecovidtracking-us@joinzoe.com
            </ClickableText>
            {'\n'}
          </RegularText>

          <RegularBoldText>Will I be paid to take part in this research study?{'\n'}</RegularBoldText>

          <RegularText>
            No payments will be made for participation in this voluntary research study.
            {'\n'}
          </RegularText>

          <RegularBoldText>What will I have to pay for if I take part in this research study?{'\n'}</RegularBoldText>
          <RegularText>
            Voluntary participation in this research study will come at no-cost to you.
            {'\n'}
          </RegularText>

          <RegularBoldText>
            If I have questions or concerns about this research study, whom can I call?{'\n'}
          </RegularBoldText>
          <RegularText>
            Zoe Global Ltd. Staff has built the app and is supporting and responsible for it. Any questions may be sent
            to{' '}
            <ClickableText onPress={() => this.openUrl('mailto:covidtrackingquestions-us@joinzoe.com')}>
              covidtrackingquestions-us@joinzoe.com
            </ClickableText>
            {'\n'}
            {'\n'}
            You may also contact local U.S. based study staff at predict@mgh.harvard.edu.
            {'\n'}
            {'\n'}
            If you were directed to this app because of your participation in another research study, you should contact
            the applicable study contact or Institutional Review Board that is associated with each study. If the study
            is affiliated with Mass General Brigham Health / Partners Healthcare, please contact the Partners Human
            Research Committee office. You can call them at 857-282-1900.
            {'\n'}
          </RegularText>

          <RegularBoldText>
            If I take part in this research study, how will you protect my privacy?{'\n'}
          </RegularBoldText>
          <RegularText>
            During this research, identifiable information about your health will be collected. In the rest of this
            section, we refer to this information simply as “health information”. In general, under federal law, health
            information is private. However, there are exceptions to this rule, and you should know who may be able to
            see, use, and share your health information for research and why they may need to do so.
            {'\n'}
          </RegularText>

          <RegularBoldText>In this study, we will collect health information about:</RegularBoldText>
          <RegularText>
            - your health status and condition related to COVID-19
            {'\n'}- any medications you are using
            {'\n'}- how you are feeling
            {'\n'}- what symptoms you might be experiencing
            {'\n'}- what, if any, treatments you’ve received either in outpatient or in-hospital settings
            {'\n'}- the outcome of any of those treatments
            {'\n'}
          </RegularText>

          <RegularBoldText>
            Who may see, use, and share your identifiable health information and why they may need to do so:
            {'\n'}
          </RegularBoldText>
          <RegularText>
            For complete details of the data we collect, who may see, use, and share your data and the reasons for doing
            so, please see the{' '}
            <ClickableText
              onPress={() => this.props.navigation.navigate('PrivacyPolicyUS', { viewOnly: this.viewOnly })}>
              Privacy Policy
            </ClickableText>
            . In brief, the privacy plan details that we may share your data with the researchers involved with this
            study which includes Zoe , other researchers and medical centers that are part of this study and their
            ethics boards, in addition to other individuals.
            {'\n'}
            No information you share will be used for commercial purposes. We will not use or share your information for
            any mailing or marketing list.
            {'\n'}
            {'\n'}
            Some people or groups who get your health information might use or share your health information without
            your permission in ways that are not described in this form. We share your health information only as
            provided in this consent form, and we ask anyone who receives it from us to take measures to protect your
            privacy.
            {'\n'}
            {'\n'}
            Because research is an ongoing process, we cannot give you an exact date when we will either destroy or stop
            using or sharing your health information.
            {'\n'}
            {'\n'}
            We may link data collected as a part of this app with additional data collected through your participation
            in other research studies you have consented to at the following institutions: Massachusetts General
            Hospital, Brigham and Women’s Hospital, Mass General Brigham Hospitals (formerly Partners Healthcare), or
            other partnering research institutions. Deidentified data, meaning that any information that can identify
            you as an individual has been removed, may be included in public databases in the future.
            {'\n'}
          </RegularText>

          <RegularBoldText>Your Privacy Rights{'\n'}</RegularBoldText>
          <RegularText>
            You have the right not to sign this form that allows us to use and share your health information for
            research; however, if you don’t sign it, you cannot take part in this research study.
            {'\n'}
            {'\n'}
            You have the right to withdraw your permission for us to use or share your health information for this
            research study. If you want to withdraw your permission, you must notify us in writing by emailing{' '}
            <ClickableText onPress={() => this.openUrl('mailto:leavecovidtracking-us@joinzoe.com')}>
              leavecovidtracking-us@joinzoe.com
            </ClickableText>
            {'\n'}
            {'\n'}
            Once permission is withdrawn, you cannot continue to take part in the study.
            {'\n'}
            {'\n'}
            If you withdraw your permission, we will not be able to take back information that has already been used or
            shared with others.
            {'\n'}
            {'\n'}
            You have the right to see and get a copy of your health information. To ask for this information, please
            contact the person in charge of this study. You may only get such information after research is finished.
            {'\n'}
            {'\n'}
            By clicking below, you consent to our using the personal information we collect through your use of this app
            in the way we have described.
            {'\n'}
            {'\n'}
            For more information about how we use and share personal information about you, please see our{' '}
            <ClickableText
              onPress={() => this.props.navigation.navigate('PrivacyPolicyUS', { viewOnly: this.viewOnly })}>
              privacy notice
            </ClickableText>
            .{'\n'}
            {'\n'}
          </RegularText>

          <RegularBoldText>Informed Consent and Authorization{'\n'}</RegularBoldText>
          <RegularBoldText>Statement of Person Giving Informed Consent and Authorization{'\n'}</RegularBoldText>
          <RegularText>
            - I have read this consent form.
            {'\n'}- This research study has been explained to me, including risks and possible benefits (if any), other
            possible treatments or procedures, and other important things about the study.
            {'\n'}- I have had the opportunity to ask questions.
            {'\n'}- I understand the information given to me.
            {'\n'}
          </RegularText>

          <RegularBoldText>Digital Signature of Subject:{'\n'}</RegularBoldText>
          <RegularText>
            I give my consent to take part in this research study and agree to allow my health information to be used
            and shared as described above.
            {'\n'}
            {'\n'}
            In addition, you acknowledge that you have read and understand the Privacy Policy and Terms of Use. The
            privacy policy describes what data is collected, how it is stored, secured, and shared, and with whom, and
            what your rights are to that data. The terms state that that the application is not meant to give medical
            advice, is not meant for emergencies and is not a medical device, and describes limitations of liability and
            data sharing plans.
            {'\n'}
          </RegularText>

          {!this.viewOnly && (
            <CheckboxList>
              <CheckboxItem value={this.state.processingChecked} onChange={this.handleProcessingChange}>
                I consent to the processing of my personal data (including without limitation data I provide relating to
                my health) as set forth in this consent and in the{' '}
                <ClickableText
                  onPress={() => this.props.navigation.navigate('PrivacyPolicyUS', { viewOnly: this.viewOnly })}>
                  Privacy Policy
                </ClickableText>
                .
              </CheckboxItem>
              <CheckboxItem value={this.state.termsOfUseChecked} onChange={this.handleTermsOfUseChange}>
                I have read and accept Zoe Global’s{' '}
                <ClickableText
                  onPress={() => this.props.navigation.navigate('TermsOfUseUS', { viewOnly: this.viewOnly })}>
                  Terms of Use
                </ClickableText>{' '}
                and{' '}
                <ClickableText
                  onPress={() => this.props.navigation.navigate('PrivacyPolicyUS', { viewOnly: this.viewOnly })}>
                  Privacy Policy
                </ClickableText>
                .
              </CheckboxItem>
            </CheckboxList>
          )}
        </ScrollView>

        {!this.viewOnly && (
          <BrandedButton
            style={styles.button}
            hideLoading
            enable={this.state.processingChecked && this.state.termsOfUseChecked}
            onPress={this.handleAgreeClicked}>
            I agree
          </BrandedButton>
        )}
      </View>
    );
  }

  private openUrl(link: string) {
    Linking.openURL(link);
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  button: {
    marginTop: 20,
  },
});
