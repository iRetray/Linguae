import React, { useReducer, createContext } from "react";

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
    case "SET_USER":
      return {
        ...state,
        ...payload,
      };
    default:
      return initialState;
  }
};

export const UserProvider = ({ children }) => {
  const [state, UserDispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={[state, UserDispatch]}>
      {children}
    </UserContext.Provider>
  );
};
