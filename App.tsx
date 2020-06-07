import CovidApp from '@covid/CovidApp';
import StorybookUIRoot from '@covid/storybook';

const ENABLE_STORYBOOK = false;
export default ENABLE_STORYBOOK ? StorybookUIRoot : CovidApp;
