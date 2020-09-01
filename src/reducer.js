import { actionTypes } from './actionTypes';

export const initialState = {
  user: null,
  messages: '',
  search: ''
};

export const reducer = (state = initialState, action) => {
  const { SET_USER, SET_MESSAGES, SET_SEARCH } = actionTypes;

  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload
      };
    default:
      return state;
  }
};
