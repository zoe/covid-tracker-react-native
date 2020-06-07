import CovidApp from '@covid/CovidApp';
import StorybookUIRoot from '@covid/storybook';

const ENABLE_STORYBOOK = true;
export default ENABLE_STORYBOOK ? StorybookUIRoot : CovidApp;
