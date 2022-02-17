import React, { useReducer, createContext, useEffect } from "react";

import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

export const UserContext = createContext({});

const initialState = {
  isLogged: false,
  name: "",
  lastName: "",
  nick: "",
  avatar: "",
};

const userReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_USER_LOGGED":
      return {
        ...state,
        ...payload,
      };
    default:
      return initialState;
  }
};

export const UserProvider = ({ children }) => {
  const auth = getAuth();
  const [state, UserDispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    setAuthPersistence();
    verifyUserLogged();
  }, []);

  const setAuthPersistence = () => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        console.info("App configured to save session");
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  const verifyUserLogged = () => {
    auth.onAuthStateChanged((user) => {
      UserDispatch({
        type: "SET_USER_LOGGED",
        payload: { isLogged: true, ...user },
      });
    });
  };

  return (
    <UserContext.Provider value={[state, UserDispatch]}>
      {children}
    </UserContext.Provider>
  );
};
