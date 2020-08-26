import { actionTypes } from './actionTypes';

export const initialState = {
  user: null
  // user: 1
};

export const reducer = (state = initialState, action) => {
  const { SET_USER } = actionTypes;
  console.log(action);

  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};
