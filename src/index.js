import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./Common/redux/Store";
import Guest from "./Guest/Guest";

import ProtectedRoute from "./Common/ProtectedRoute";
import Home from "./Common/Home";
import Login from "./Login";

import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// Role_Applicant
// import LoanOnApplicant from "./Role_Applicant/LoanOnApplicant"
import LoanListApplicant from "./Role_Applicant/LoanListApplicant";

// Role_Admin
import Checklist from "./Role_Admin/Checklist";
import CarManufactureYear from "./Role_Admin/Lookups/CarManufactureYear";
import CarModel from "./Role_Admin/Lookups/CarModel";
import HomeType from "./Role_Admin/Lookups/HomeType";

// Role_Officer
import LoanOnOfficer from "./Role_Officer/LoanOnOfficer";

// Collaterals
import Collaterals from "./Collaterals/Collaterals";
import CarCollateralFiles from "./Collaterals/CarCollateralFiles";

// Common
import CustomerProfileEdit from "./Common/CustomerProfileEdit";
import LoanOnApplicant from "./Role_Applicant/LoanOnApplicant";
import Review from "./Review/Review";
import LoanOnAuditor from "./Role_Auditor/LoanOnAuditor";
import CustomerMaritalMarriedEdit from "./Review/Edit/CustomerMaritalMarriedEdit";
import CustomerMaritalSingleEdit from "./Review/Edit/CustomerMaritalSingleEdit";
import CustomerLoanEdit from "./Review/Edit/CustomerLoanEdit";

// Report
import AgreementDoc from "./Reports/AgreementDoc";
import Reports from "./Reports/Reports";
import TextToAudio from "./Common/TextToAudio";
import HelpApplicant from "./Help/HelpApplicant";
import HelpAuditor from "./Help/HelpAuditor";
import HelpOfficer from "./Help/HelpOfficer";
import HelpPlanner from "./Help/HelpPlanner";

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
              <Route path="/texttoaudio" element={<TextToAudio />} />

              {/* Collaterals  */}
              <Route path="/collaterals/:loanId" element={<Collaterals />} />
              <Route
                path="/carcollateralfiles/:collateralId"
                element={<CarCollateralFiles />}
              />

              {/* Reports  */}
              <Route
                path="/reports/:customerId/:loanId"
                element={<Reports />}
              />

              {/* General  */}
              <Route path="/review/:customerId/:loanId" element={<Review />} />

              {/* Distribution  */}

              {/* Auditor */}
              <Route
                path="/loanonauditor/:customerId/:loanId"
                element={<LoanOnAuditor />}
              />

              {/* Applicant  */}
              <Route path="loanlistapplicant" element={<LoanListApplicant />} />
              <Route
                path="/customerprofileedit/:customerId"
                element={<CustomerProfileEdit />}
              />
              <Route
                path="/loanonapplicant/:customerId/:loanId"
                element={<LoanOnApplicant />}
              />
              <Route
                path="/marriedcustomeredit/:customerId"
                element={<CustomerMaritalMarriedEdit />}
              />
              <Route
                path="/singlecustomeredit/:customerId"
                element={<CustomerMaritalSingleEdit />}
              />
              <Route
                path="/customerloanedit/:customerId/:loanId"
                element={<CustomerLoanEdit />}
              />

              {/* Help  */}
              <Route path="/helpapplicant" element={<HelpApplicant />} />
              <Route path="/helpauditor" element={<HelpAuditor />} />
              <Route path="/helpofficer" element={<HelpOfficer />} />
              <Route path="/helpplanner" element={<HelpPlanner />} />

              {/* Officer  */}
              <Route
                path="/loanonofficer/:customerId/:loanId"
                element={<LoanOnOfficer />}
              />

              {/* Admin Request  */}
              <Route path="/checklist/:chktypeid" element={<Checklist />} />
              <Route path="/carmodel" element={<CarModel />} />
              <Route path="/hometype" element={<HomeType />} />
              <Route
                path="/carmanufactureyear"
                element={<CarManufactureYear />}
              />
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
