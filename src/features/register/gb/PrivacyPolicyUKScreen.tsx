import { BrandedButton } from '@covid/components';
import { ClickableText, RegularBoldText, RegularText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features';
import { BulletedTextBlock } from '@covid/features/register/components/LegalComponents';
import { openWebLink } from '@covid/utils/links';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'PrivacyPolicyUK'>;
  route: RouteProp<ScreenParamList, 'PrivacyPolicyUK'>;
};

export class PrivacyPolicyUKScreen extends React.Component<PropsType, object> {
  viewOnly = this.props.route.params.viewOnly;

  render() {
    return (
      <View style={styles.rootContainer}>
        <ScrollView>
          <RegularBoldText>Your consent{'\n'}</RegularBoldText>
          <RegularBoldText>European General Data Protection Regulation{'\n'}</RegularBoldText>
          <RegularText>
            Because the work Zoe Global Limited does takes place in the UK, the European Union’s “General Data
            Protection Regulation” (GDPR) applies to our processing of your personal data, even if you do not live in
            Europe.
            {'\n\n'}
            We process two kinds of information about you:
            {'\n'}
          </RegularText>

          <RegularBoldText>Sensitive personal data{'\n'}</RegularBoldText>

          <RegularText>
            This is information about you, your health and your symptoms if unwell. It includes:
            {'\n\n'}- Information about your health (including your body temperature, height and weight){'\n'}-
            Information about pre-existing conditions{'\n'}- Information about your symptoms{'\n'}- Your COVID-19 test
            status{'\n'}- Details of any treatment you have received{'\n'}- General information about you such as your
            sex at birth, your year of birth and your location (including postcode){'\n'}- Whether you are a health
            worker coming into contact with patients{'\n'}- Whether you are a member of the UK twins study{'\n'}
            {'\n\n'}
            We may also ask other questions from time to time, such as:
            {'\n\n'}- Information about your diet{'\n'}- What you do if and when you go out, such as where you go and
            whether you wear a mask or other protection{'\n'}
            {'\n\n'}
            We process this data in order that:
            {'\n\n'}- We can better understand symptoms of COVID-19{'\n'}- We can follow the spread of COVID-19, for
            example so that we can identify hotspots{'\n'}- We can identify the exposure of healthcare workers to
            COVID-19{'\n'}- We can advance scientific research into the links between patient's health and their
            response to infection by COVID-19{'\n'}- In the future we may use this data to help the NHS support sick
            individuals
            {'\n\n'}
            Our legal basis for processing it is that you consented to our doing so. Because of the tight regulatory
            requirements placed on us, we need your consent to process data about your health, which means that if you
            do not consent (or withdraw your consent), we cannot allow you to use the app. This is not meant unkindly,
            we are simply not able to provide you with the service without your consent.
            {'\n\n'}
            We share this data with people doing health research, for example, people working in:
            {'\n\n'}- Hospitals{'\n'}- NHS.{'\n'}- Universities.{'\n'}- Health charities.{'\n'}- Other research
            institutions.
            {'\n\n'}A full list of institutions we have shared data with can be found at the bottom of this page. An
            anonymous code is used to replace your personal details when we share this with researchers outside the NHS
            or King's College London.
            {'\n\n'}
            Before sharing any of your data with researchers outside of the UK, we will remove your name, phone number,
            email address and the last 3 digits of your post code to protect your privacy.
            {'\n\n'}
            Because of the nature of the research we carry out, we are unable to set any particular time limit on the
            storage of your sensitive personal data, but we will keep it under regular review and ensure that it is not
            kept longer than is necessary.
            {'\n\n'}
            If you wish us to stop processing your sensitive personal data, you may withdraw your consent at any time by
            emailing us at leavecovidtracking@joinzoe.com. When you withdraw your consent, we will delete all sensitive
            personal data we hold about you.
            {'\n'}
          </RegularText>

          <RegularBoldText>Other personal data{'\n'}</RegularBoldText>

          <RegularText>
            We also collect contact information and other information from your device including:
            {'\n\n'}- Your name (optional){'\n'}- Email address (optional){'\n'}- Phone number (optional){'\n'}- A user
            name and password{'\n'}- IP address{'\n'}- Device ID{'\n'}
          </RegularText>

          <RegularText>
            We use this information for the following purposes:
            {'\n\n'}- Asking you for feedback on the app or conducting other forms of survey.{'\n'}- Keeping in touch
            with you about the app and its performance.{'\n'}- Sending you information about new versions of the app or
            similar apps we may have in the future.{'\n'}- Identifying faults or other problems connected with the app
            {'\n\n'}
            We will not send any emails not meant individually for you (for example marketing emails) if you do not want
            us to do so. Every such email will include a link you can click to opt-out from receiving them. We will not
            sell your contact information to third-parties.
            {'\n\n'}
            Our legal basis for processing this information is our legitimate interest in developing, marketing and
            running the app.
            {'\n\n'}
            We keep your contact information for 6 years after the last communication with us, or the last use of the
            app, for liability purposes, then we delete it.
            {'\n'}
          </RegularText>

          <RegularBoldText>Recording information for others{'\n'}</RegularBoldText>
          <RegularText>
            The app also allows you to input information about other people in addition to your own by making a separate
            profile for them. If the other person is able to understand the concept of consent, for example if they are
            a mentally competent adult or mature child, then you must only do this if they have given their consent.
            {'\n\n'}
            Younger children may not be mature enough to give consent, but they may be able to understand what you are
            doing. If so, you should explain to them what you are doing and what may happen to information about them to
            the extent they are capable of understanding. You should also try to take into account their views, even if
            you make the ultimate decision. We trust you to know your child and to do what is appropriate given their
            level of maturity.{'\n'}
          </RegularText>

          <RegularBoldText>School Attendance{'\n'}</RegularBoldText>
          <RegularText>
            If your child is attending school, you may optionally tell us about their school, their bubble and other
            things about their attendance. We use this information in the same way we use other sensitive personal data,
            but in addition we may (where it would not identify any individual) use it to alert you to an infection in
            your child’s bubble and to help the school plan for any impact of COVID-19.{'\n'}
          </RegularText>

          <RegularBoldText>Third party processors for both kinds of information{'\n'}</RegularBoldText>
          <RegularText>
            We use third parties to process some of your personal data on our behalf. When we allow them access to your
            data, we do not permit them to use it for their own purposes. We have in place with each processor, a
            contract that requires them only to process the data on our instructions and to take proper care in using
            it. They are not permitted to keep the data after our relationship with them has ended.
            {'\n\n'}
            These processors include:
          </RegularText>
          <BulletedTextBlock
            text={[
              'Google Cloud Platform',
              'SurveyMonkey',
              'Segment',
              'Expo',
              'Google Firebase',
              'Amplitude',
              'Google G Suite',
              'MailChimp',
              'Mailgun',
              'Intercom',
              'Sentry',
              'Cloudflare',
              'Sqreen',
            ]}
          />

          <RegularBoldText>Your rights{'\n'}</RegularBoldText>
          <RegularText>
            Under the{' '}
            <ClickableText
              onPress={() =>
                openWebLink('http://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32016R0679&from=EN')
              }
            >
              GDPR
            </ClickableText>{' '}
            you have a number of important rights free of charge. In summary, those include rights to:
            {'\n\n'}- Access your personal information {'\n'}- Require us to correct any mistakes in your information
            which we hold {'\n'}- Require the erasure of personal information concerning you in certain situations{' '}
            {'\n'}- Receive the personal information concerning you which you have provided to us, in a structured,
            commonly used and machine-readable format and have the right to transmit those data to a third party in
            certain situations {'\n'}- Object to decisions being taken by automated means which produce legal effects
            concerning you or similarly significantly affect you {'\n'}- Object in certain other situations to our
            continued processing of your personal information {'\n'}- Otherwise restrict our processing of your personal
            information in certain circumstances
            {'\n\n'}
            For further information on each of those rights, including the circumstances in which they apply, see the{' '}
            <ClickableText
              onPress={() =>
                openWebLink(
                  'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/',
                )
              }
            >
              Guidance from the United Kingdom Information Commissioner’s Office (ICO) on individuals rights under the
              General Data Protection Regulation.
            </ClickableText>
            {'\n\n'}
            If you would like to exercise any of those rights, please email, call or write to our data protection
            officer using the contact details given below.
            {'\n\n'}
            The{' '}
            <ClickableText
              onPress={() =>
                openWebLink('http://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32016R0679&from=EN')
              }
            >
              General Data Protection Regulation
            </ClickableText>{' '}
            also gives you the right to lodge a complaint with a supervisory authority, in particular in the European
            Union (or European Economic Area) state where you work, normally live or where any alleged infringement of
            data protection laws occurred. The supervisory authority in the UK is the Information Commissioner who may
            be contacted at{' '}
            <ClickableText onPress={() => openWebLink('https://ico.org.uk/make-a-complaint/')}>
              https://ico.org.uk/make-a-complaint/your-personal-information-concerns/
            </ClickableText>{' '}
            or telephone: <RegularBoldText>+44 0303 123 1113</RegularBoldText>.{'\n'}
          </RegularText>

          <RegularBoldText>About us{'\n'}</RegularBoldText>

          <RegularText>
            Our UK address is: Zoe Global Limited, 164 Westminster Bridge Road, London SE1 7RW{'\n\n'}
            Data Protection Officer: dpo@joinzoe.com
            {'\n'}
          </RegularText>

          <RegularBoldText>Institutions we share data with{'\n'}</RegularBoldText>

          <RegularText>
            King’s College London{'\n'}
            Guys & St Thomas' Hospitals{'\n'}
            NHS{'\n'}
            Swansea University (SAIL Databank){'\n'}
            Harvard University{'\n'}
            Stanford University{'\n'}
            Massachusetts General Hospital{'\n'}
            Tufts University{'\n'}
            Berkeley University{'\n'}
            Nottingham University{'\n'}
            University of Trento{'\n'}
            Lund University
          </RegularText>
        </ScrollView>

        {!this.viewOnly ? (
          <BrandedButton onPress={() => this.props.navigation.goBack()} style={styles.button}>
            Back
          </BrandedButton>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },

  rootContainer: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
});
