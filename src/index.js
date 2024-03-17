import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from './Common/redux/Store';
import Guest from './Guest/Guest';

import ProtectedRoute from './Common/ProtectedRoute';
import Home from './Common/Home';
import Login from './Login';

import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

// Role_Applicant 
// import LoanOnApplicant from "./Role_Applicant/LoanOnApplicant"
import LoanListApplicant from "./Role_Applicant/LoanListApplicant";

// Role_Officer
import LoanOnOfficer from "./Role_Officer/LoanOnOfficer";

// Collaterals
import Collaterals from "./Collaterals/Collaterals";
import CarCollateralFiles from "./Collaterals/CarCollateralFiles";

// Common 
import CustomerProfileEdit from "./Common/CustomerProfileEdit";

const root = ReactDOM.createRoot(document.getElementById("root"));
let persistor = persistStore(store);


root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <BrowserRouter basename={"/"}>
          <Routes>
            <Route path="/guest" element={<Guest />}>
              <Route path="login" element={<Login />} />
            </Route>
            <Route path="/" element={<App />}>
              <Route
                path=""
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              {/* <Route path='/estrahel' element={<Estrahel/>} /> */}

              {/* Collaterals  */}
              <Route path="/collaterals/:loanId" element={<Collaterals />} />
              <Route path="/carcollateralfiles/:collateralId" element={<CarCollateralFiles />} />
              {/* <Route path="/collateralcarmarketvalue/:carId" element={<CollateralCarMarketValueEdit />} /> */}

              {/* Reports  */}

              {/* General  */}

              {/* Distribution  */}

              {/* Auditor  loanonauditor */}

              {/* Applicant  */}
              <Route path="loanlistapplicant" element={ <LoanListApplicant />} />
              <Route path="/customerprofileedit/:customerId" element={<CustomerProfileEdit />} />

              {/* Officer  */}
              <Route path="/loanonofficer/:customerId/:loanId" element={<LoanOnOfficer />} />


              {/* Admin Request  */}
            </Route>
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
