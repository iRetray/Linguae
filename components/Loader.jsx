import React from "react";

import SyncLoader from "react-spinners/SyncLoader";

export function Loader({ text, color: customColor }) {
  return (
    <div className="LoaderContainer">
      <SyncLoader size={10} color={customColor || "#c00021"} />
      <span style={customColor ? { color: customColor } : null}>
        {text || "Loading..."}
      </span>
    </div>
  );
}
