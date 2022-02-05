import React from "react";

import {
  FirebaseAppProvider,
  FirestoreProvider,
  useFirebaseApp,
} from "reactfire";
import { getFirestore } from "firebase/firestore";
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
  const firestoneInstance = getFirestore(useFirebaseApp());

  return (
    <FirestoreProvider sdk={firestoneInstance}>{children}</FirestoreProvider>
  );
}

function Linguae({ Component, pageProps }) {
  return (
    <FirebaseGlobalProvider>
      <FirebaseSDKProvider>
        <IconContext.Provider value={{ size: "23" }}>
          <Component {...pageProps} />
        </IconContext.Provider>
      </FirebaseSDKProvider>
    </FirebaseGlobalProvider>
  );
}

export default Linguae;
