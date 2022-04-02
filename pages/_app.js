import React, { Fragment, useContext, useEffect } from "react";

import { DefaultSeo } from "next-seo";
import defaultSEO from "../config/defaultSEO";
import themes from "../config/themes";

import { ThemeContext, ThemeProvider, UserProvider } from "../contexts";

import {
  FirebaseAppProvider,
  FirestoreProvider,
  AuthProvider,
  useFirebaseApp,
} from "reactfire";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { IconContext } from "react-icons";

import firebaseConfig from "../services/firebaseConfig";

import "antd/dist/antd.css";
import "../styles/globals.scss";

function FirebaseGlobalProvider({ children }) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      {children}
    </FirebaseAppProvider>
  );
}

function FirebaseSDKProvider({ children }) {
  const firebaseApp = useFirebaseApp();
  const firestoneInstance = getFirestore(firebaseApp);
  const authInstance = getAuth(firebaseApp);

  return (
    <AuthProvider sdk={authInstance}>
      <FirestoreProvider sdk={firestoneInstance}>{children}</FirestoreProvider>
    </AuthProvider>
  );
}

function ContextProvider({ children }) {
  return (
    <IconContext.Provider value={{ size: "23" }}>
      <ThemeProvider>
        <UserProvider>{children}</UserProvider>
      </ThemeProvider>
    </IconContext.Provider>
  );
}

function LinguaeApp({ Component, pageProps }) {
  const [themeState] = useContext(ThemeContext);

  useEffect(() => {
    const themeName = themeState.isDarkMode ? "DARK" : "LIGHT";
    const { backgroundColor, emphasisColor, fontColor, backgroundSecondary } =
      themes.find(({ name }) => name === themeName);
    const rootStyle = document.documentElement;
    rootStyle.style.setProperty("--backgroundColor", backgroundColor);
    rootStyle.style.setProperty("--emphasisColor", emphasisColor);
    rootStyle.style.setProperty("--fontColor", fontColor);
    rootStyle.style.setProperty("--backgroundSecondary", backgroundSecondary);
  }, [themeState]);

  return (
    <Fragment>
      <DefaultSeo {...defaultSEO} />
      <Component {...pageProps} />
    </Fragment>
  );
}

function Linguae({ Component, pageProps }) {
  return (
    <FirebaseGlobalProvider>
      <FirebaseSDKProvider>
        <ContextProvider>
          <LinguaeApp Component={Component} pageProps={pageProps} />
        </ContextProvider>
      </FirebaseSDKProvider>
    </FirebaseGlobalProvider>
  );
}

export default Linguae;
