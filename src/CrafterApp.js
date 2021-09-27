import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Analytics from "react-router-ga";
import i18next from "i18next";
import { Helmet } from "react-helmet";
import * as serviceWorker from "./serviceWorkerRegistration";
import CookieConsent from "./components/CookieConsent";
import DiscordButton from "./components/DiscordButton";
import Routes from "./router";
import "./css/style.min.css";

function CrafterApp() {
  const [t] = useTranslation();
  const [showChangeLanguageModal, setChangeLanguageModal] = useState(false);
  const [newUpdate, setUpdateModal] = useState(false);
  let showHideClassName = showChangeLanguageModal
    ? "modal d-block"
    : "modal d-none";
  let showUpdateModal = newUpdate ? "modal d-block" : "modal d-none";
  serviceWorker.register({
    onUpdate: () => {
      setUpdateModal(true);
    },
  });

  return (
    <Router>
      <Helmet
        htmlAttributes={{
          lang: localStorage.getItem("i18nextLng")
            ? localStorage.getItem("i18nextLng")
            : "en",
        }}
      >
        <link
          rel="stylesheet"
          href={
            localStorage.getItem("darkmode") !== "false"
              ? "/css/darkly.min.css"
              : "/css/journal.min.css"
          }
        />
      </Helmet>
      <header>
        <div className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <span>Stiletto</span>.live
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbar-main-menu"
              aria-controls="navbar-main-menu"
              aria-expanded="false"
              aria-label="Toggle Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                role="img"
                focusable="false"
              >
                <title>{t("Menu")}</title>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                  d="M4 7h22M4 15h22M4 23h22"
                ></path>
              </svg>
            </button>
            <div className="collapse navbar-collapse" id="navbar-main-menu">
              <ul
                className="navbar-nav mr-auto mb-2 mb-md-0"
                itemScope="itemscope"
                itemType="http://www.schema.org/SiteNavigationElement"
              >
                <li className="nav-item">
                  <Link itemProp="url" className="nav-link" to="/crafter">
                    <span itemProp="name">{t("Crafting")}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    itemProp="url"
                    className="nav-link"
                    to={
                      localStorage.getItem("profile") != null ? "/maps" : "/map"
                    }
                  >
                    <span itemProp="name">{t("Resource Maps")}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link itemProp="url" className="nav-link" to="/clanlist">
                    <span itemProp="name">{t("Clan List")}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link itemProp="url" className="nav-link" to="/trades">
                    <span itemProp="name"> {t("Trades")}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link itemProp="url" className="nav-link" to="/auctions">
                    <span itemProp="name">{t("Auction Timers")}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link itemProp="url" className="nav-link" to="/quality">
                    <span itemProp="name">{t("Quality")}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link itemProp="url" className="nav-link" to="/tech">
                    <span itemProp="name"> {t("Tech Tree")}</span>
                  </Link>
                </li>
              </ul>
              <button
                className="btn btn-sm"
                onClick={() => {
                  setChangeLanguageModal(true);
                }}
              >
                <img
                  className="rounded"
                  width="30%"
                  src={
                    localStorage.getItem("i18nextLng") != null
                      ? localStorage.getItem("i18nextLng").includes("es")
                        ? "/img/es.jpg"
                        : localStorage.getItem("i18nextLng").includes("ru")
                        ? "/img/ru.jpg"
                        : localStorage.getItem("i18nextLng").includes("fr")
                        ? "/img/fr.jpg"
                        : localStorage.getItem("i18nextLng").includes("de")
                        ? "/img/de.jpg"
                        : localStorage.getItem("i18nextLng").includes("it")
                        ? "/img/it.jpg"
                        : localStorage.getItem("i18nextLng").includes("ja")
                        ? "/img/ja.jpg"
                        : localStorage.getItem("i18nextLng").includes("pl")
                        ? "/img/pl.jpg"
                        : localStorage.getItem("i18nextLng").includes("zh")
                        ? "/img/zh.jpg"
                        : localStorage.getItem("i18nextLng").includes("pt")
                        ? "/img/pt.jpg"
                        : "/img/en.jpg"
                      : "/img/en.jpg"
                  }
                  alt="Change language"
                />
              </button>
              <DiscordButton />
            </div>
          </div>
        </div>
      </header>
      <main role="main" className="flex-shrink-0">
        <div className="container-fluid pt-4">
          <Analytics
            id={
              localStorage.getItem("acceptscookies")
                ? process.env.REACT_APP_GA_ID
                : ""
            }
          >
            {Routes}
          </Analytics>
          <div className={showUpdateModal}>
            <div className="modal-dialog border border-success">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{t("New web update")}</h5>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      setUpdateModal(false);
                    }}
                  >
                    {t("Cancel")}
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => updateWeb()}
                  >
                    {t("Update")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={showHideClassName}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">{t("Change language")}</div>
                <div className="modal-body">
                  <div className="row text-center">
                    <div className="col-3">
                      <img
                        className="img-thumbnail"
                        src="/img/es.jpg"
                        alt="Spanish language"
                        onClick={() => switchLanguage("es")}
                      />
                      <p>{t("Spanish")}</p>
                    </div>
                    <div className="col-3">
                      <img
                        className="img-thumbnail"
                        src="/img/en.jpg"
                        alt="English language"
                        onClick={() => switchLanguage("en")}
                      />
                      <p>{t("English")}</p>
                    </div>
                    <div className="col-3">
                      <img
                        className="img-thumbnail"
                        src="/img/ru.jpg"
                        alt="Russian language"
                        onClick={() => switchLanguage("ru")}
                      />
                      <p>{t("Russian")}</p>
                    </div>
                    <div className="col-3">
                      <img
                        className="img-thumbnail"
                        src="/img/fr.jpg"
                        alt="French language"
                        onClick={() => switchLanguage("fr")}
                      />
                      <p>{t("French")}</p>
                    </div>
                    <div className="col-3">
                      <img
                        className="img-thumbnail"
                        src="/img/de.jpg"
                        alt="German language"
                        onClick={() => switchLanguage("de")}
                      />
                      <p>{t("German")}</p>
                    </div>
                    <div className="col-3">
                      <img
                        className="img-thumbnail"
                        src="/img/zh.jpg"
                        alt="Chinese Simplified language"
                        onClick={() => switchLanguage("zh")}
                      />
                      <p>{t("Chinese Simplified")}</p>
                    </div>
                    <div className="col-3">
                      <img
                        className="img-thumbnail"
                        src="/img/it.jpg"
                        alt="Italian language"
                        onClick={() => switchLanguage("it")}
                      />
                      <p>{t("Italian")}</p>
                    </div>
                    <div className="col-3">
                      <img
                        className="img-thumbnail"
                        src="/img/ja.jpg"
                        alt="Japanese language"
                        onClick={() => switchLanguage("ja")}
                      />
                      <p>{t("Japanese")}</p>
                    </div>
                    <div className="col-3">
                      <img
                        className="img-thumbnail"
                        src="/img/pl.jpg"
                        alt="Polish language"
                        onClick={() => switchLanguage("pl")}
                      />
                      <p>{t("Polish")}</p>
                    </div>
                    <div className="col-3">
                      <img
                        className="img-thumbnail"
                        src="/img/pt.jpg"
                        alt="Polish language"
                        onClick={() => switchLanguage("pt")}
                      />
                      <p>{t("Portuguese, Brazilian")}</p>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <p className="mr-auto">v. 3.18.4</p>
                  <button
                    className={
                      localStorage.getItem("darkmode") !== "true"
                        ? "btn btn-outline-secondary"
                        : "btn btn-outline-light"
                    }
                    onClick={() => {
                      setChangeLanguageModal(false);
                    }}
                  >
                    {t("Accept")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="footer footer mt-auto">
        <div className="container-fluid py-3 bg-dark text-white">
          <div className="row">
            <div className="col-xl-10">
              © 2021 Dm94Dani{" | "}{" "}
              <Link className="text-white" to="/privacy">
                {t("Privacy Policy")}
              </Link>{" "}
              {" | "}
              <a
                title="GitHub package.json version"
                href="https://github.com/dm94/stiletto-web"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  alt="GitHub package.json version"
                  src="https://img.shields.io/github/package-json/v/dm94/stiletto-web"
                />
              </a>
              {" | "}
              <a
                title="GitHub last commit"
                href="https://github.com/dm94/stiletto-web"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  alt="GitHub last commit"
                  src="https://img.shields.io/github/last-commit/dm94/stiletto-web"
                />
              </a>
              {" | "}
              <a
                title="Crowdin"
                target="_blank"
                rel="noopener noreferrer"
                href="https://crowdin.com/project/stiletto"
              >
                <img
                  alt="Crowdin translations"
                  src="https://badges.crowdin.net/stiletto/localized.svg"
                />
              </a>
              {" | "}
              {t(
                "This website uses utilities related to the game 'Last Oasis' but is not affiliated with"
              )}{" "}
              <a
                href="https://www.donkey.team/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Donkey Crew
              </a>
            </div>
            <div className="col-xl-2">{darkMode(t)}</div>
          </div>
        </div>
      </footer>
      <CookieConsent />
    </Router>
  );
}

function updateWeb() {
  localStorage.removeItem("allItems");
  caches.keys().then(function (names) {
    for (let name of names) {
      caches.delete(name);
    }
  });
  window.location.reload();
}

function switchLanguage(lng) {
  localStorage.setItem("i18nextLng", lng);
  i18next.changeLanguage(lng);
}

function darkMode(t) {
  if (localStorage.getItem("darkmode") !== "false") {
    return (
      <button
        className="btn btn-sm btn-outline-light"
        onClick={() => {
          if (localStorage.getItem("acceptscookies")) {
            localStorage.setItem("darkmode", false);
            window.location.reload();
          }
        }}
      >
        <i className="far fa-sun"></i> {t("Light Theme Mode")}
      </button>
    );
  } else {
    return (
      <button
        className="btn btn-sm btn-outline-light"
        onClick={() => {
          if (localStorage.getItem("acceptscookies")) {
            localStorage.setItem("darkmode", true);
            window.location.reload();
          }
        }}
      >
        <i className="far fa-moon"></i> {t("Dark Theme Mode")}
      </button>
    );
  }
}

export default CrafterApp;
