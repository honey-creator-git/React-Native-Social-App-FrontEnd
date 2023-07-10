import { userConstants } from '../constants'

const INITIAL_STATE = {
  userLoggedIn: false,
  users: null,
  user : null,
  token: null,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case userConstants.SET_USER:
      state.userLoggedIn = true;
      state.user = action.userData;
      state.token = action.userToken;
      return state
    case userConstants.UPDATE_USER:
      state.user = action.userData;
      return state
    case userConstants.GET_ALL_USERS:
      state.users = action.allUsers;
      return state
    case userConstants.LOGOUT:
      state.userLoggedIn = false;
      state.user = null;
      state.token = null;
      return state
    default:
      return state
  }
}


