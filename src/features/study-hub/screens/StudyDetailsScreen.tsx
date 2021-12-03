import { Avatar, DoctorProfile, Text } from '@covid/components';
import { NavHeader } from '@covid/components/NavHeader';
import { ScrollView } from '@covid/components/ScrollView';
import Analytics, { events } from '@covid/core/Analytics';
import { TRootState } from '@covid/core/state/root';
import { studyHubSlice } from '@covid/core/state/study-hub/slice';
import { EInteraction } from '@covid/core/state/study-hub/types';
import { CardExternalResource } from '@covid/features/study-hub/components/CardExternalResource';
import { IconBMI } from '@covid/features/study-hub/components/IconBMI';
import { IconGlobe } from '@covid/features/study-hub/components/IconGlobe';
import { IconLightBulb } from '@covid/features/study-hub/components/IconLightBulb';
import { IconMicroscope } from '@covid/features/study-hub/components/IconMicroscope';
import { IconPencil } from '@covid/features/study-hub/components/IconPencil';
import { IconProfileInfo } from '@covid/features/study-hub/components/IconProfileInfo';
import { IconTime } from '@covid/features/study-hub/components/IconTime';
import { IllustrationCancer } from '@covid/features/study-hub/components/IllustrationCancer';
import { IllustrationDementia } from '@covid/features/study-hub/components/IllustrationDementia';
import { IllustrationHeartDisease } from '@covid/features/study-hub/components/IllustrationHeartDisease';
import { RowInterested } from '@covid/features/study-hub/components/RowInterested';
import { StudyDetailRow } from '@covid/features/study-hub/components/StudyDetailRow';
import { EStudyKey, TStudies } from '@covid/features/study-hub/types';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { sizes } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

type TProps = {
  route: RouteProp<TScreenParamList, 'StudyDetails'>;
};

export function StudyDetailsScreen(props: TProps) {
  const [showFullBlog, setShowFullBlog] = React.useState(false);
  const dispatch = useDispatch();
  const safeAreaInsets = useSafeAreaInsets();
  const studies = useSelector<TRootState, TStudies>((state) => state.studyHub.studies);

  React.useEffect(() => {
    dispatch(studyHubSlice.actions.addStudyHubInteraction(EInteraction.VISIT_DETAILS_SCREEN));
  }, []);

  const showMoreOnPress = () => {
    setShowFullBlog(true);
    Analytics.track(events.STUDY_HUB_READ_MORE, { study: props.route.params.study.key });
  };

  let IllustrationComponent;
  if (props.route.params?.study.key === EStudyKey.GUT_MICROBIOME_CANCER_DEVELOPMENT) {
    IllustrationComponent = IllustrationCancer;
  } else if (props.route.params?.study.key === EStudyKey.IMMUNE_HEALTH_HEART_DISEASE) {
    IllustrationComponent = IllustrationHeartDisease;
  } else if (props.route.params?.study.key === EStudyKey.SIGNS_DEMENTIA_CHANGES_COGNITION) {
    IllustrationComponent = IllustrationDementia;
  }

  return (
    <View style={styles.flex} testID="study-details-screen">
      <View
        style={{
          backgroundColor: colors.lightBlueBackground,
          height: safeAreaInsets.top,
        }}
      />
      <NavHeader backgroundColor={colors.lightBlueBackground} />
      <ScrollView
        bottomBackgroundColor="white"
        contentContainerStyle={styles.flexGrow}
        style={styles.scrollView}
        topBackgroundColor={colors.lightBlueBackground}
      >
        {IllustrationComponent ? <IllustrationComponent style={styles.illustration} /> : null}
        <View style={styles.headerWrapper}>
          <Text inverted colorPalette="uiDark" colorShade="darker" textClass="h3Regular">
            {props.route.params?.study.title}
          </Text>
          <Text inverted colorPalette="uiDark" colorShade="main" style={styles.organiserText} textClass="pMedium">
            {props.route.params?.study.organiser}
          </Text>

          {props.route.params?.study ? (
            <RowInterested study={studies[props.route.params.study.key as keyof TStudies]} />
          ) : null}
        </View>
        <View style={styles.bodyWrapper}>
          <StudyDetailRow
            description={props.route.params?.study.researchFocus}
            IconComponent={IconLightBulb}
            title={i18n.t('study-hub.study-details.research-focus')}
          />
          <TouchableOpacity disabled={showFullBlog} onPress={showMoreOnPress}>
            <Text
              inverted
              colorPalette="uiDark"
              colorShade="dark"
              numberOfLines={showFullBlog ? undefined : 3}
              style={styles.marginTop}
              textClass="p"
            >
              {props.route.params?.study.blog}
            </Text>

            {showFullBlog ? null : (
              <Text inverted colorPalette="actionSecondary" colorShade="main" textClass="p">
                {i18n.t('read-more')}
              </Text>
            )}
          </TouchableOpacity>
          <View style={styles.lineHorizontal} />
          <StudyDetailRow
            description={props.route.params?.study.whoCanJoin}
            IconComponent={IconProfileInfo}
            style={styles.marginBottom}
            title={i18n.t('study-hub.study-details.who-can-join')}
          />
          <StudyDetailRow
            description={props.route.params?.study.commitment}
            IconComponent={IconTime}
            style={styles.marginBottom}
            title={i18n.t('study-hub.study-details.commitment')}
          />
          <StudyDetailRow
            description={props.route.params?.study.whatsInvolved}
            IconComponent={IconPencil}
            style={styles.marginBottom}
            title={i18n.t('study-hub.study-details.whats-involved')}
          />
          <StudyDetailRow
            description={props.route.params?.study.whatDoINeed}
            IconComponent={IconBMI}
            title={i18n.t('study-hub.study-details.what-do-i-need')}
          />
          <View style={styles.lineHorizontal} />
          <StudyDetailRow IconComponent={IconMicroscope} title={i18n.t('study-hub.study-details.lead-scientist')} />
          <DoctorProfile
            imageNode={<Avatar source={props.route.params?.study.scientist.imageSource} />}
            location={props.route.params?.study.scientist.location}
            name={props.route.params?.study.scientist.name}
            style={styles.marginTop}
            title={props.route.params?.study.scientist.title}
          />
          <View style={styles.lineHorizontal} />
          <StudyDetailRow IconComponent={IconGlobe} title={i18n.t('study-hub.study-details.the-bigger-picture')} />
          {props.route.params?.study.externalResources?.map((externalResource) => (
            <CardExternalResource
              imageSource={externalResource.imageSource}
              key={`card-external-resource-${externalResource.id}`}
              style={styles.marginTop}
              title={externalResource.title}
              url={externalResource.url}
            />
          ))}
          <View
            style={{
              height: safeAreaInsets.bottom,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bodyWrapper: {
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: sizes.m,
    paddingVertical: sizes.xl,
  },
  flex: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  fullWidth: {
    width: '100%',
  },
  headerWrapper: {
    backgroundColor: colors.lightBlueBackground,
    paddingHorizontal: sizes.m,
    paddingVertical: sizes.xl,
  },
  illustration: {
    alignSelf: 'center',
  },
  lineHorizontal: {
    backgroundColor: colors.hrColor,
    height: 1,
    marginVertical: sizes.xl,
  },
  marginBottom: {
    marginBottom: sizes.l,
  },
  marginTop: {
    marginTop: sizes.m,
  },
  organiserText: {
    marginBottom: sizes.l,
    marginTop: sizes.xs,
  },
  scrollView: {
    backgroundColor: colors.lightBlueBackground,
  },
});
