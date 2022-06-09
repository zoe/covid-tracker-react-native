import { RootState } from '../store';

// Amend the value you would like to extract from the example state as needed
// eg. useExampleCheck = (state: RootState) => state.example.check;
export const useExample = (state: RootState) => state.example;
