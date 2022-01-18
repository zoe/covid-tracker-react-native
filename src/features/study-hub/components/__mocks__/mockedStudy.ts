import { EStudyKey, TStudy } from '@covid/features/study-hub/types';
import { colors } from '@theme';

export const mockedStudy: TStudy = {
  blog: 'blog',
  cardColor: colors.studyPurple,
  commitment: '1 day',
  externalResources: [],
  id: '1',
  interest_count: 1,
  key: EStudyKey.GUT_MICROBIOME_CANCER_DEVELOPMENT,
  organiser: 'ZOE',
  patient_is_interested: false,
  researchFocus: 'research',
  scientist: { location: 'test location', name: 'test name', title: 'test title' },
  title: 'Our first study',
  whatDoINeed: 'nothing',
  whatsInvolved: 'everything',
  whoCanJoin: 'everyone',
};
