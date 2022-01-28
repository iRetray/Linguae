import React from "react";

import { IconContext } from "react-icons";

import "../styles/globals.scss";
import "antd/dist/antd.css";

function Linguae({ Component, pageProps }) {
  return (
    <IconContext.Provider value={{ size: "23" }}>
      <Component {...pageProps} />
    </IconContext.Provider>
  );
}

export default Linguae;
