import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter} from 'react-router-dom'
import Main from "./components/Main";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "flag-icon-css/css/flag-icons.min.css";
window.userId=0
window.studentType = "Innovator"; // Entepreneur  Innovator
window.jwtTokenResult = "";
window.refreshJwtToken = "";
window.dbUserId=100
window.engagementId = 100
window.dob=""
window.pincode=""
window.primaryContactNumber=""
window.loginType=""
i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "mr", "hi"],
    fallbackLng: "mr",
    debug: false,
    // Options for language detector
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    // react: { useSuspense: false },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
      requestOptions: {
        cache: "no-store",
      },
    },
  });

const loadingMarkup = (
  <div className="py-4 text-center">
    <h3>Loading..</h3>
  </div>
);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
 
  <Suspense fallback={loadingMarkup}>
     <BrowserRouter>
    <App />
    </BrowserRouter>
  </Suspense>,
);
