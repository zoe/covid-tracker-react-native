export type AppScreenContent = {
  ThankYou: ScreenContent;
  Welcome: ScreenContent;
  WelcomeRepeat: ScreenContent;
};

export type ScreenContent = {
  title_text: string;
  body_text: string;
  body_link: string;
  body_photo: string | null;
  link_text: string;
  experiment_name: string;
  cohort_id: number;
  analytics: string;
};
