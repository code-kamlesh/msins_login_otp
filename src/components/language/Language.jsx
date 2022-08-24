import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";
import classNames from "classnames";
import { LanguageIcon } from "./LanguageIcon";
import { Box } from "@mui/material";

const languages = [
  {
    code: "mr",
    name: "मराठी",
    country_code: "in",
  },
  {
    code: "hi",
    name: "हिन्दी",
    country_code: "in",
  },

  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
];

export default function Language() {
  const currentLanguageCode = cookies.get("i18next") || "mr";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("app_title");
  }, [currentLanguage, t]);

  return (
    <Box className="dropdown" sx={{ marginLeft: "10px" }} variant="contained">
      <button
        className="btn btn-link dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <LanguageIcon />
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <span className="dropdown-item-text">{t("language")}</span>
        </li>
        {languages.map(({ code, name, country_code }) => (
          <li key={country_code}>
            <a
              href="#"
              className={classNames("dropdown-item", {
                disabled: currentLanguageCode === code,
              })}
              onClick={() => {
                i18next.changeLanguage(code);
              }}
            >
              <span
                className={`flag-icon flag-icon-${country_code} mx-2`}
                style={{
                  opacity: currentLanguageCode === code ? 0.5 : 1,
                }}
              ></span>
              {name}
            </a>
          </li>
        ))}
      </ul>
    </Box>
  );
}
