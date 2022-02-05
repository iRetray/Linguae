import React from "react";

import ScaleLoader from "react-spinners/ScaleLoader";

export function Loader({ text, color: customColor }) {
  return (
    <div className="LoaderContainer">
      <ScaleLoader color={customColor || "#c00021"} />
      <span style={customColor ? { color: customColor } : null}>
        {text || "Loading..."}
      </span>
    </div>
  );
}
