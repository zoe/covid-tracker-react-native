import Screen, { Header } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  navigation?: StackNavigationProp<ScreenParamList, 'PcrTestLearnMore'>;
}

function PcrTestLearnMoreScreen({ navigation }: IProps) {
  return (
    <Screen showBackButton navigation={navigation}>
      <Header>
        <HeaderText>Learn more</HeaderText>
      </Header>
      <View style={styles.contentContainer}>
        <RegularText style={styles.paragraph}>
          Thank you so much for using the COVID Symptom Study app and helping to fight the outbreak. ZOE is very excited
          to be able to offer you a chance to get tested for COVID-19. By getting tested, your results will help
          understand the level of COVID-19 infections in your area, so this really will make a difference.
        </RegularText>
        <RegularText style={styles.paragraph}>
          You’ve recently reported feeling unwell with a particular combination of symptoms. Whilst these symptoms do
          not necessarily indicate that you have COVID-19, we would like to offer you a test to discover if you have the
          virus right now. Even if you have been recently vaccinated, your test results are very valuable to understand
          possible post-vaccine infections. Depending on your symptoms, you should follow the latest government guidance
          for households with possible coronavirus infection.You may also invite any other app users who live in the
          same household with you to also be tested.
        </RegularText>
        <RegularText style={styles.paragraph}>
          This request comes from our work with the Department of Health and Social Care (DHSC) to give you access to a
          COVID-19 test. This testing process is run by the Department of Health, and no data will come to us until you
          choose to share it. For clarity, you may have been invited to participate in a clinical study run by King's
          College London, but this email and any test results you may enter are a separate project and will not be part
          of that study.
        </RegularText>
        <RegularText style={styles.paragraph}>
          The Department of Health is therefore inviting you to have a PCR swab test to confirm whether you are
          currently positive or negative for the virus. This will let you know your status and help us develop an even
          better understanding of which symptoms are most related to COVID-19 infection.
        </RegularText>
        <RegularText style={styles.paragraph}>
          The decision to take the test is entirely voluntary and we will not report your choice to Track and Trace or
          to the Department of Health. However, if you take a test and the result is positive, you must self-isolate as
          per the instructions of the Department of Health. If you would like to be tested, please book this as soon as
          possible as the test only works if you are actively infectious. Please keep logging your symptoms every day
          and make sure to enter the results of your test into the app once you get them.
        </RegularText>
        <RegularText style={styles.paragraph}>Thank you so much for your amazing contribution to science.</RegularText>
        <RegularText>
          Tim Spector <br />
          on behalf of ZOE
        </RegularText>
        <RegularText>
          Please read the following key information carefully before booking a test. NOTE: WE ARE USING A NEW PROCESS.
          <ul>
            <li>
              To access the test, please go to the NHS Covid Test Portal here. Please answer the questions as normal.
            </li>
            <ul>
              <li>
                For the first step, if you have one of the core three symptoms, select “Yes, at least one of these
                symptoms”; if you do not have any of the core three symptoms, select “No, none of these symptoms”
              </li>
              <li>
                On the following question, please do NOT select to indicate that you are an essential worker unless that
                is true for you (note that this is different from what we asked you to do previously) When you are asked
                whether you are part of a trial or government pilot project, please select “Yes” Then select “The person
                was told to get a test by the COVID Symptom Study app (by ZOE)” Please note: this permission only
                applies to you as the study participant and to any other app users who live in the same household with
                you. You must not encourage other members of your family or friends, except those in your household, to
                access a test unless they have also been invited as a study participant or a symptomatic essential
                worker, and therefore already qualify. You will then be offered the choice between a home testing kit or
                booking a testing slot at one of our regional testing sites (RTS’s). Home tests are delivered to your
                address. You then self-administer the swab (taking a sample from both your nose and throat) before
                returning the kit for analysis via a courier. Full instructions will be delivered along with the kit.
                Please note: capacity for these tests is released at the beginning of each day and demand is high.
                Therefore you may find that there are none available when you attempt to book. In this case, please
                select a slot at a suitable RTS, if possible. If you have trouble getting a home testing kit, please
                check the website soon after 0800 or 1700 as kits can book out within hours after each time slot when
                they are released. Regional Testing Sites are distributed across the UK, with more than 50 sites now
                available. You can book a slot at the site nearest to you (if capacity is available) or at another site
                with available capacity and within a regional driving distance. Please note: this opportunity is
                currently only available to app users within England and Northern Ireland. We are working to expand this
                to Scotland and Wales. Once you have selected your home testing kit or booked a testing slot at an RTS,
                you will then see a summary screen with your name mobile number and profession listed. Please note:
                check that your phone number is correct as this is how you will receive further information, including
                your test results. Once you have submitted your application you will receive a text message with a link
                to either a) claim your home testing kit or b) book a slot at a regional testing site. Once you have
                completed your tests, results will be sent back to you by the Department of Health and Social Care. This
                will confirm whether you were positive or negative for COVID-19, or, in a minority of cases, whether it
                was not possible to confirm your result. Please note: you are then responsible for reporting these
                results in the COVID Symptom Study app. They will not be automatically shared by the test site.
              </li>
            </ul>
          </ul>
        </RegularText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
  },
  paragraph: {
    marginBottom: 24,
  },
});

export default PcrTestLearnMoreScreen;
