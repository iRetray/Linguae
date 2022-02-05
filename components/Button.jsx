import React from "react";

/* eslint-disable no-unused-vars */
export const Button = React.forwardRef(function Button(
  { text, icon, onClick, type, isSmall, isYellow },
  ref
) {
  return (
    <div
      className={`ButtonContainer ${type || "primary"} ${
        isYellow && "yellow"
      } ${isSmall && "small"}`}
      onClick={onClick}
    >
      {icon}
      <span style={{ marginLeft: icon && "10px" }}>{text}</span>
    </div>
  );
});
