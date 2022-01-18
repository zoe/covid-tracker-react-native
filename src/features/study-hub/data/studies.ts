import { drClaireSteves, drPhilChowienczyk, drTimSpector } from '@assets';
import { colors } from '@theme';

const imageSourceWorldHearthDay = require('../assets/world_hearth_day_illustration.jpg');

export const studies = {
  gut_microbiome_cancer_development: {
    blog: 'Our bodies are home to trillions of microbes (mainly bacteria), most of which are found in the gut.\n\nMany of these microbes are key to keeping our bodies healthy via the immune system which prevents new cancers from forming and responds to cancer treatment.\n\nBy giving us a view of your gut health, habits and transit time over an extended period, you can help us to formulate the best diets to prevent and beat cancer.',
    cardColor: colors.studyYellow,
    commitment: '15 mins, every 3 months',
    externalResources: [
      {
        id: 'gut_microbiome_cancer_development_external_resource_1',
        imageSource: null,
        title: 'Meet the scientists taking on 3 of the biggest challenges in cancer research',
        url: 'https://news.cancerresearchuk.org/2019/01/23/meet-the-scientists-taking-on-3-of-the-biggest-challenges-in-cancer-research/',
      },
    ],
    orderIndex: 1,
    organiser: 'ZOE & King’s College London',
    researchFocus: 'Can you change your diet to help your gut microbes fight cancer?',
    scientist: {
      imageSource: drTimSpector,
      location: "King's College London",
      name: 'Prof Tim Spector',
      title: 'Professor of genetic epidemiology',
    },
    title: 'The Role of the Gut Microbiome in Cancer Development',
    whatDoINeed:
      'If completing the optional gut transit experiment, you will need basic baking ingredients and utensils, oven, and edible blue dye',
    whatsInvolved:
      'Complete a short survey about cancer diagnoses and family history and complete a diet questionnaire.\n\nOptional gut transit experiment: Baking and eat a muffin with blue dye and record the time for it to transit through your system (instructions will be provided).',
    whoCanJoin: 'All ZOE COVID Study primary account holders',
  },
  immune_health_heart_disease: {
    blog: "Our immune system can sometimes attack the body instead of protecting it, and blood vessels are particularly prone to injury.\n\nAs a result, people with overactive immune systems are more likely to suffer from cardiovascular problems at a younger age. We've also seen that people with high blood pressure are less likely to get natural antibodies from COVID-19 infection.\n\nBy regularly recording your blood pressure in the app, you will help us run the world's largest study of the immune system and blood pressure and help us discover how lifestyle factors can influence this interaction.",
    cardColor: colors.studyPurple,
    commitment: '15 mins, once a month',
    externalResources: [
      {
        id: 'immune_health_heart_disease_external_resource_1',
        imageSource: imageSourceWorldHearthDay,
        title: 'World Heart Day: How our cardiovascular scientists are tackling heart disease',
        url: 'https://www.imperial.ac.uk/news/230676/world-heart-day-how-cardiovascular-scientists',
      },
    ],
    orderIndex: 0,
    organiser: 'ZOE & King’s College London',
    researchFocus: 'Can your immune system protect your heart health?',
    scientist: {
      imageSource: drPhilChowienczyk,
      location: 'Pharmacology',
      name: 'Prof Phil Chowienczyk',
      title: 'Professor of Clinical Cardiovascular',
    },
    title: 'The Role of Immune Health in Heart Disease',
    whatDoINeed: 'Blood Pressure Monitor',
    whatsInvolved:
      'Answer a few survey questions and link up your physical activity information from your other apps/wearables',
    whoCanJoin: 'All ZOE COVID Study primary account holders',
  },
  signs_dementia_changes_cognition: {
    blog: "How the mind works changes substantially with dementia - but research increasingly shows that subtle deteriorations start happening well before dementia is officially diagnosed.\n\nThese may occur in people's memory, reaction times, and decision-making abilities.\n\nHelp us to find early tell-tale changes, so  we can improve early dementia diagnosis and identify what can be done to slow down or even prevent dementia onset.",
    cardColor: colors.studyTurquoise,
    commitment: '10 mins, once a month',
    externalResources: [
      {
        id: 'signs_dementia_changes_cognition_external_resource_1',
        imageSource: null,
        title: 'Subtle changes in daily functioning predict conversion from normal to (...)',
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5628501/',
      },
    ],
    orderIndex: 2,
    organiser: 'ZOE & King’s College London',
    researchFocus: 'Can you prevent dementia by pinpointing early signs?',
    scientist: {
      imageSource: drClaireSteves,
      location: "King's College London",
      name: 'Dr Claire Steves',
      title: 'Senior Clinical Lecturer',
    },
    title: 'Identifying early signs of Dementia through changes in Cognition',
    whatDoINeed: 'Nothing',
    whatsInvolved: 'Complete a series of mini-tasks designed to measure various aspects of cognition',
    whoCanJoin: 'All ZOE COVID Study primary account holders',
  },
};
