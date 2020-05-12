import React, { Component, ReactElement } from 'react';
import { StyleSheet, Image, Text, View, Animated, LayoutChangeEvent, ViewStyle } from 'react-native';
import { colors } from '../../../theme';
import { Card } from 'native-base';
import { RegularText } from '../Text';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { arrowDown } from '../../../assets';
import { BrandedButton } from '../BrandedButton';
import i18n from '../../locale/i18n';
import { getAvatarByName, AvatarName } from '../../utils/avatar';
import { Patient } from '../../features/multi-profile/SelectProfileScreen';
import moment from 'moment';
import { forModalPresentationIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';

type Props = {
  alert: boolean;
  patient: Patient;
  handleReportNow: VoidFunction;
};

type States = {
  expanded: boolean;
  opacityAnimation: Animated.Value;
  heightAnimation: Animated.Value;
  rotationAnimation: Animated.Value;
};

const DataRow: React.FC<{
  title: String;
  value: String;
}> = ({ title, value }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 12 }}>
      <RegularText>{title}</RegularText>
      <RegularText>{value}</RegularText>
    </View>
  );
};

export class UserReportCard extends Component<Props, States> {
  state = {
    expanded: false,
    opacityAnimation: new Animated.Value(0),
    heightAnimation: new Animated.Value(0),
    rotationAnimation: new Animated.Value(0),
  };

  constructor(props: Readonly<Props>) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  private toggle = () => {
    const expanded = !this.state.expanded;
    this.setState({
      expanded: expanded,
    });
    Animated.parallel([
      this.animateOpacity(expanded),
      this.animateHeight(expanded),
      this.animateRotation(expanded),
    ]).start();
  };

  private animateOpacity(nextState: boolean): Animated.CompositeAnimation {
    const nextAnimationValue = (shown: boolean): number => {
      return shown === true ? 1 : 0;
    };
    const initialState = nextAnimationValue(!nextState);
    const finalState = nextAnimationValue(nextState);

    this.state.opacityAnimation.setValue(initialState);

    return Animated.spring(this.state.opacityAnimation, {
      toValue: finalState,
    });
  }

  private animateHeight(nextState: boolean): Animated.CompositeAnimation {
    const nextAnimationValue = (shown: boolean): number => {
      return shown === true ? this.getMaxContentHeight() : 0;
    };
    const initialState = nextAnimationValue(!nextState);
    const finalState = nextAnimationValue(nextState);

    this.state.heightAnimation.setValue(initialState);

    return Animated.spring(this.state.heightAnimation, {
      toValue: finalState,
      friction: 10,
    });
  }

  private animateRotation(nextState: boolean): Animated.CompositeAnimation {
    const nextAnimationValue = (shown: boolean): number => {
      return shown === true ? 1 : 0;
    };
    const initialState = nextAnimationValue(!nextState);
    const finalState = nextAnimationValue(nextState);

    this.state.rotationAnimation.setValue(initialState);

    return Animated.spring(this.state.rotationAnimation, {
      toValue: finalState,
      friction: 10,
    });
  }

  private getMaxContentHeight(): number {
    return this.hasReportedRecently() ? 120 : 200;
  }

  private getAvatar(): any {
    return getAvatarByName((this.props.patient.avatar_name ?? 'profile1') as AvatarName);
  }

  private hasReportedRecently(): boolean {
    const { last_reported_at } = this.props.patient;
    if (!last_reported_at) {
      return false;
    }
    const today = moment(new Date());
    const lastReported = moment(last_reported_at);
    const hours = moment.duration(today.diff(lastReported)).asHours();
    return hours <= 24;
  }

  private getToggleRotationInterpolate(): Animated.AnimatedInterpolation {
    return this.state.rotationAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
  }

  render() {
    const { patient } = this.props;
    const shouldRemind = !this.hasReportedRecently();
    const cardStyles: ViewStyle[] = [styles.card];

    if (shouldRemind) {
      cardStyles.push(styles.alertBorder);
    }

    return (
      <Card style={cardStyles} key={patient.id}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image source={this.getAvatar()} style={styles.avatar} resizeMode="contain" />
            <RegularText>{patient.name}</RegularText>
          </View>
          <TouchableOpacity onPress={this.toggle}>
            <Animated.Image
              source={arrowDown}
              style={[
                styles.toggleButton,
                {
                  transform: [{ rotate: this.getToggleRotationInterpolate() }],
                },
              ]}
            />
          </TouchableOpacity>
        </View>
        <Animated.View
          style={[
            styles.expandableContainer,
            {
              opacity: this.state.opacityAnimation,
              height: this.state.heightAnimation,
            },
          ]}>
          <View style={styles.expandableContent}>
            <View>
              <View style={styles.seperator} />
              <DataRow
                title={i18n.t('user-report-overview-card.symptoms-reported')}
                value={`${patient.report_count}` ?? '0'}
              />
              <DataRow title={i18n.t('user-report-overview-card.last-reported')} value="Yesterday" />
            </View>
            {shouldRemind && (
              <BrandedButton style={styles.cta} onPress={this.props.handleReportNow}>
                <Text>{i18n.t('user-report-overview-card.cta')}</Text>
              </BrandedButton>
            )}
          </View>
        </Animated.View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 24,
  },
  alertBorder: {
    borderWidth: 1,
    borderColor: 'red',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
  },
  avatar: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  seperator: { marginTop: 16, marginBottom: 12, height: 1, width: '100%', backgroundColor: colors.grey },
  toggleButton: {
    height: 12,
    width: 12,
    tintColor: colors.primary,
  },
  expandableContainer: {
    overflow: 'hidden',
  },
  expandableContent: {
    height: 'auto',
    justifyContent: 'space-between',
  },
  cta: {
    marginTop: 16,
  },
});
