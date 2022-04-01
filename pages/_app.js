import React, { Fragment } from "react";

import { DefaultSeo } from "next-seo";
import defaultSEO from "../config/defaultSEO";

import { ThemeProvider, UserProvider } from "../contexts";

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

function Linguae({ Component, pageProps }) {
  return (
    <FirebaseGlobalProvider>
      <FirebaseSDKProvider>
        <IconContext.Provider value={{ size: "23" }}>
          <ThemeProvider>
            <UserProvider>
              <Fragment>
                <DefaultSeo {...defaultSEO} />
                <Component {...pageProps} />
              </Fragment>
            </UserProvider>
          </ThemeProvider>
        </IconContext.Provider>
      </FirebaseSDKProvider>
    </FirebaseGlobalProvider>
  );
}

export default Linguae;
