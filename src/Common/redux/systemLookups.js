import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sideBar: true,
  Blue: "#035397",
  Orange: "#FF7700",
  Gray: "#F4F2F2",
  // amisisUserExternalIdDetail: [],
  // amisisReduxUserDetail: [],
  // amisisReduxLoanDetail: [],
  // amisisReduxSavingShareDetail: [],
  targetClient: [],
  targetLoan: [],
};

const sysytemLookupSlice = createSlice({
  name: "systemLookups",
  initialState: initialState,
  reducers: {
    setSideBar: (state, action) => {
      return {
        ...state,
        sideBar: !state.sideBar,
      };
    },

    // set all data needed from amisis (start)
    setAmisisUserExternalIdDetail: (state, action) => {
      console.log(action);
      return {
        ...state,
        amisisUserExternalIdDetail: action.payload.amisisUserExternalIdDetail,
      };
    },

    setAmisisReduxUserDetails: (state, action) => {
      console.log(action);
      return {
        ...state,
        amisisReduxUserDetail: action.payload.amisisUserDetail,
      };
    },
    setAmisisReduxLoanDetail: (state, action) => {
      return {
        ...state,
        amisisReduxLoanDetail: action.payload.amisisLoanDetail,
      };
    },
    setAmisisReduxSavingShareDetail: (state, action) => {
      return {
        ...state,
        amisisReduxSavingShareDetail: action.payload.amisisSavingShareDetail,
      };
    },
    // set all data needed from amisis (end)

    // set all data needed from django (start)
    setTargetClient: (state, action) => {
      return {
        ...state,
        targetClient: action.payload.targetClient,
      };
    },
    setTargetLoan: (state, action) => {
      console.log('settinng target loan')
      console.log(action)
      return {
        ...state,
        targetLoan: action.payload.targetLoan,
      };
    },
    // set all data needed from django (end)

    resetStore: (state, action) => {
      return {
        sideBar: true,
        Blue: "#035397",
        Orange: "#FF7700",
        Gray: "#F4F2F2",
        // amisisUserExternalIdDetail: [],
        // amisisReduxUserDetail: [],
        // amisisReduxLoanDetail: [],
        // amisisReduxSavingShareDetail: [],
        targetClient: [],
        targetLoan: [],
      };
    },
  },
});

export const {
  setSideBar,
  setTargetClient,
  setTargetLoan,
  resetStore,
  // setAmisisUserExternalIdDetail,
  // setAmisisReduxUserDetails,
  // setAmisisReduxLoanDetail,
  // setAmisisReduxSavingShareDetail,
} = sysytemLookupSlice.actions;
export default sysytemLookupSlice.reducer;
