import {BaseAction} from '../../types/BaseAction';
import {ActionTypes} from '../actions/ActionTypes.constants';

export type ErrorState = {
  error: string;
};

const initialState: ErrorState = {
  error: '',
};

export const errorReducer = (state = initialState, action: BaseAction) => {
  switch (action.type) {
    case ActionTypes.SET_ERROR_MESSAGE:
      return {...state, error: action.payload};
    default:
      return state;
  }
};
