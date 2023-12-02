import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
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
    checkUserSession(state, action) { },
    googleSignInStart(state, action) { },
    emailSignInStart(state, action) { },
    signInSuccess(state, action) {
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailed(state, action) {
      state.error = action.payload;
    },
    signUpStart(state, action) {},
    signUpSuccess(state, action) { },
    signUpFailed(state, action) {
      state.error = action.payload;
    },
    signOutStart(state, action) { },
    signOutSuccess(state, action) {
      state.currentUser = null;
      state.error = null;
    },
    signOutFailed(state, action) {
      state.error = action.payload;
    },

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