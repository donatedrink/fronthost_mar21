import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  serverIP: 'http://localhost:8000/',
  currLink: '',
  langName: 'am',

};

const settingSlice = createSlice({
  name: 'setting',
  initialState: initialState,
  reducers: {
    setIsLoading: (state, action) => {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    },

    changeCurrLink: (state, action) => {
      return {
        ...state,
        currLink: action.payload.currLink,
      };
    },

    changeIP: (state, action) => {
      return {
        ...state,
        serverIP: action.payload.serverIP,
      };
    },

    changeLang: (state, action) => {
      return {
        ...state,
        langName: action.payload.langName,
      };
    },
    resetSetting: (state, action) => {
      return {
        ...state,
        serverIP: 'http://localhost:8000/',

      };
    },

  },
});

export const { setIsLoading, changeCurrLink, changeLang, changeIP, resetSetting } = settingSlice.actions;
export default settingSlice.reducer;
