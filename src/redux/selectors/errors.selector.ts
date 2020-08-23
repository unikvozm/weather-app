import {Store} from '../reducers/root.reducer';

const getError = (state: Store): string => state.error.error;

export const errorSelector = {
  getError,
};
