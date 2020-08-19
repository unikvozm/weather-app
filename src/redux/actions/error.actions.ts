import {BaseAction} from '../../types/BaseAction';
import {ActionTypes} from './ActionTypes.constants';

const setErrorMessage = (message: string): BaseAction => ({
  type: ActionTypes.SET_ERROR_MESSAGE,
  payload: message,
});

export const errorActions = {
  setErrorMessage,
};
