import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '../../utils';


export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    signInSuccess(state, action) {
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailed(state, action) {
      state.error = action.payload;
    },
    signUpFailed(state, action) {
      state.error = action.payload;
    },
    signOutStart() { },
    signOutSuccess(state) {
      state.currentUser = null;
      state.error = null;
    },
    signOutFailed(state, action) {
      state.error = action.payload;
    },
    checkUserSession() { },
    googleSignInStart() { },
    emailSignInStart(state, action) { },
    signUpStart(state, action) { },
    signUpSuccess(state, action) { },
  },
});

export const { setCurrentUser,
  checkUserSession,
  googleSignInStart,
  emailSignInStart,
  signInSuccess,
  signInFailed,
  signUpStart,
  signUpSuccess,
  signUpFailed,
  signOutStart,
  signOutSuccess,
  signOutFailed } = userSlice.actions;

export const userReducer = userSlice.reducer;