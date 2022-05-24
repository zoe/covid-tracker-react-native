import { usualSelfModal0 } from '@assets/v2/png';
import IconSadFace from '@assets/v2/svg/icon-sad-face';
import IconSmileFace from '@assets/v2/svg/icon-smile-face';
import IconTiredFace from '@assets/v2/svg/icon-tired-face';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import { optionsKnob, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Button from '@tracer/components/atoms/Button';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import Card, { ICardProps } from '@tracer/components/molecules/Card';
import Modal from '@tracer/components/molecules/Modal';
import StackedCard from '@tracer/components/organisms/Card/stacked';
import Callout from '@tracer/components/templates/Callout';
import React from 'react';
import { Text } from 'react-native';

import { CenterView } from '../CenterView';

const standardCardProps: ICardProps = {
  bodyProps: {
    body: 'The Role of Immune Health in Heart Disease',
  },
  footerProps: {
    footerProps: {
      footerTxt: '→ More Details',
    },
  },
  headerProps: {
    headerProps: {
      title: 'ZOE & King’s College London',
    },
  },
};

const indexModalStore = new Store({ show: true });

storiesOf('Organisms/Modal', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('index', () => {
    return (
      <State store={indexModalStore}>
        <Modal
          onRequestClose={action('closing-modal-triggered')}
          swipeDirection={optionsKnob(
            'Swipe Direction',
            {
              down: 'down',
              up: 'up',
            },
            'up',
            {
              display: 'inline-radio',
            },
          )}
          visible={indexModalStore.get('show')}
        >
          <Card {...standardCardProps} />
        </Modal>
      </State>
    );
  })
  .add('w/ cover image', () => {
    return (
      <StackedCard
        cardProps={{
          customBody: (
            <Row style={{ height: grid.g32 + grid.g24, justifyContent: 'center', marginVertical: grid.g16 }}>
              <Text
                style={{
                  fontSize: grid.g24,
                  fontWeight: '400',
                  letterSpacing: 0,
                  lineHeight: grid.g32,
                  textAlign: 'center',
                }}
              >
                {text('Body', 'Your Usual Self is set up!')}
              </Text>
            </Row>
          ),
          customFooter: (
            <>
              <Button
                onPress={action('clicked-redirect-to-assessment-flow')}
                style={{ marginVertical: grid.g4 }}
                text="Submit your first new daily report"
                textStyle={{ textTransform: 'none' }}
              />
              <Button
                buttonType="tertiary"
                onPress={action('clicked-close')}
                style={{ marginVertical: grid.g4 }}
                text="Close"
              />
            </>
          ),
          heroImage: { source: usualSelfModal0 },
        }}
        style={{ paddingHorizontal: grid.g16, paddingVertical: grid.g24 }}
      />
    );
  })
  .add('no image card', () => {
    return (
      <StackedCard
        cardProps={{
          customBody: (
            <Row style={{ justifyContent: 'center', marginVertical: grid.g16 }}>
              <Text
                style={{
                  fontSize: grid.g16,
                  fontWeight: '300',
                  letterSpacing: 0,
                  lineHeight: grid.g24,
                  textAlign: 'center',
                }}
              >
                {text(
                  'Body',
                  'The reason why we ask for the frequency of symptoms is to get a full picture of your symptoms and how often they occur.\n\nA symptom you experience daily will be part of what we call your Usual Self. A symptom you experience less often will be registered but will not show as part of your Usual Self.',
                )}
              </Text>
            </Row>
          ),
          customFooter: (
            <>
              <Button
                onPress={action('clicked-redirect-to-assessment-flow')}
                style={{ marginVertical: grid.g16 }}
                text="OK"
                textStyle={{ textTransform: 'none' }}
              />
            </>
          ),
          customHeader: (
            <Text
              style={{
                fontSize: grid.g24,
                fontWeight: '500',
                letterSpacing: 0,
                lineHeight: grid.g32,
                marginVertical: grid.g8,
                textAlign: 'center',
              }}
            >
              {text('Title', 'Frequency of symptom')}
            </Text>
          ),
        }}
        style={{ paddingHorizontal: grid.g16, paddingVertical: grid.g24 }}
      />
    );
  })
  .add('w/ side by side icon and text rows', () => {
    return (
      <StackedCard
        cardProps={{
          customBody: (
            <Row style={{ justifyContent: 'center', marginVertical: grid.g8 }}>
              <Column style={{ paddingHorizontal: grid.g16 }}>
                <Row style={{ marginBottom: grid.g8 }}>
                  <Text
                    style={{
                      fontSize: grid.g16,
                      fontWeight: '300',
                      letterSpacing: 0,
                      lineHeight: grid.g24,
                      textAlign: 'left',
                    }}
                  >
                    {text(
                      'Body',
                      'In order to capture how some symptoms may not affect you very much, while others might have a significant impact on your daily life, each symptom is marked using the pictograms below:',
                    )}
                  </Text>
                </Row>
                <Row style={{ marginVertical: grid.g8 }}>
                  <IconSmileFace opacity="1" />
                  <Text
                    style={{
                      color: colors.brand,
                      fontSize: grid.g16,
                      fontWeight: '300',
                      letterSpacing: 0,
                      lineHeight: grid.g24,
                      marginLeft: grid.g12,
                      paddingRight: grid.g16,
                      textAlign: 'left',
                    }}
                  >
                    Symptom is present but not bothering you significantly
                  </Text>
                </Row>
                <Row style={{ marginVertical: grid.g8 }}>
                  <IconSadFace opacity="1" />
                  <Text
                    style={{
                      color: colors.brand,
                      fontSize: grid.g16,
                      fontWeight: '300',
                      letterSpacing: 0,
                      lineHeight: grid.g24,
                      marginLeft: grid.g12,
                      paddingRight: grid.g16,
                      textAlign: 'left',
                    }}
                  >
                    Symptom impacts your daily activities to some degree e.g. prevents you from doing a normal exercise
                    routine
                  </Text>
                </Row>
                <Row style={{ marginVertical: grid.g8 }}>
                  <IconTiredFace opacity="1" />
                  <Text
                    style={{
                      color: colors.brand,
                      fontSize: grid.g16,
                      fontWeight: '300',
                      letterSpacing: 0,
                      lineHeight: grid.g24,
                      marginLeft: grid.g12,
                      paddingRight: grid.g16,
                      textAlign: 'left',
                    }}
                  >
                    Symptom impacts your daily activities significantly, e.g. interrupts sleep, physical activity,
                    social life, work etc.{' '}
                  </Text>
                </Row>
              </Column>
            </Row>
          ),
          customFooter: (
            <>
              <Button
                onPress={action('clicked-redirect-to-assessment-flow')}
                style={{ marginBottom: grid.g16, marginTop: grid.g32 }}
                text="OK"
                textStyle={{ textTransform: 'none' }}
              />
            </>
          ),
          customHeader: (
            <Text
              style={{
                fontSize: grid.g24,
                fontWeight: '500',
                letterSpacing: 0,
                lineHeight: grid.g32,
                marginVertical: grid.g8,
                textAlign: 'center',
              }}
            >
              {text('Title', 'Impact on quality of life')}
            </Text>
          ),
        }}
        style={{ paddingHorizontal: grid.g16, paddingVertical: grid.g24, width: '90%' }}
      />
    );
  })
  .add('not feeling right tab', () => {
    return (
      <StackedCard
        cardProps={{
          customBody: (
            <Row style={{ justifyContent: 'center', marginVertical: grid.g16 }}>
              <Text
                style={{
                  fontSize: grid.g16,
                  fontWeight: '300',
                  letterSpacing: 0,
                  lineHeight: grid.g24,
                  textAlign: 'center',
                }}
              >
                {text(
                  'Body',
                  'If you have access to a Lateral Flow Test (LFT), we’d recommend taking one today to help keep COVID infection numbers up to date.\n\n Please report your result in the app in the bottom Profile tab.',
                )}
              </Text>
            </Row>
          ),
          customFooter: (
            <>
              <Button
                onPress={action('clicked-redirect-to-assessment-flow')}
                style={{ marginTop: grid.g16 }}
                text="OK"
                textStyle={{ textTransform: 'none' }}
              />
            </>
          ),
          customHeader: (
            <Text
              style={{
                fontSize: grid.g24,
                fontWeight: '500',
                letterSpacing: 0,
                lineHeight: grid.g32,
                marginVertical: grid.g8,
                textAlign: 'center',
              }}
            >
              {text('Title', 'We’re sorry you’re not\nfeeling quite right')}
            </Text>
          ),
        }}
        style={{ paddingHorizontal: grid.g16, paddingVertical: grid.g24, width: '90%' }}
      />
    );
  })
  .add('w/ callout', () => {
    return (
      <StackedCard
        cardProps={{
          customBody: (
            <Column style={{ justifyContent: 'center', marginVertical: grid.g16 }}>
              <Text
                style={{
                  fontSize: grid.g16,
                  fontWeight: '300',
                  letterSpacing: 0,
                  lineHeight: grid.g24,
                  textAlign: 'center',
                }}
              >
                {text(
                  'Body',
                  'Your Usual Self was created when you set up your Usual Self. It shows any symptoms to reflect how you usually feel.\n\nWe use this as a baseline to understand how your personal symptoms may differ over time.\n\nYour Usual Self will automatically update based on your reports to better reflect how you feel currently.',
                )}
              </Text>
              <Row style={{ paddingTop: grid.g24 }}>
                <Callout
                  compact
                  calloutType="warning"
                  text={text(
                    'Text',
                    'Please note, we’re not a medical advice engine. If you’re worried about any symptom, report directly to your doctor.',
                  )}
                />
              </Row>
            </Column>
          ),
          customFooter: (
            <>
              <Button
                onPress={action('clicked-redirect-to-assessment-flow')}
                style={{ marginTop: grid.g16 }}
                text="OK"
                textStyle={{ textTransform: 'none' }}
              />
            </>
          ),
          customHeader: (
            <Text
              style={{
                fontSize: grid.g24,
                fontWeight: '500',
                letterSpacing: 0,
                lineHeight: grid.g32,
                marginVertical: grid.g8,
                textAlign: 'center',
              }}
            >
              {text('Title', 'Your Usual Self')}
            </Text>
          ),
        }}
        style={{ paddingHorizontal: grid.g16, paddingVertical: grid.g24, width: '90%' }}
      />
    );
  });
