import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  token: '',
  data: {},
};

const customerSlice = createSlice({
  name: 'customer',
  initialState: initialState,
  reducers: {
    custRegister: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        data: action.payload.responseData.user,
      };
    },

    custLogin: (state, action) => {
      console.log(action);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.responseData.token.access,
        data: action.payload.responseData.user,
      };
    },

    custLogout: (state, action) => {
      return { data: {}, isAuthenticated: false };
    },
  },
});

export const { custRegister, custLogin, custLogout } = customerSlice.actions;

export default customerSlice.reducer;
