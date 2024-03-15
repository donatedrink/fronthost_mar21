import React, { useEffect } from "react";
import AuthenticatedFooter from "./Common/AuthenticatedFooter";
import AuthenticatedNav from "./Common/AuthenticatedNav";
import { Outlet } from "react-router-dom";

import {  useSelector } from "react-redux";
import global_en from "./Common/translations/en/global.json";
import global_es from "./Common/translations/es/global.json";
import "react-toastify/dist/ReactToastify.css";


import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: "en",
  compatibilityJSON: "v3",
  resources: {
    en: {
      global: global_en,
    },
    es: {
      global: global_es,
    },
  },
});

function App() {
  const { isAuthenticated, data } = useSelector((store) => store.customer);

  useEffect(() => {
    const lng = "en";
  }, []);
  return (
    <React.Fragment>
      {isAuthenticated && <AuthenticatedNav />}
        <Outlet />
      {isAuthenticated && <AuthenticatedFooter />}
    </React.Fragment>
  );
}

export default App;
