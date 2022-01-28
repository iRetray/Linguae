import React from "react";

export default function Button({
  text,
  icon,
  onClick,
  type,
  isSmall,
  isYellow,
}) {
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
}
