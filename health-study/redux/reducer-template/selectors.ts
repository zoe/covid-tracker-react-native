import { RootState } from '../store';

export const useExampleValue = (state: RootState) => state.example.value;
