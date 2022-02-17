import React from "react";

export const Select = ({ options }) => {
  return (
    <div className="SelectContainer">
      <select>
        {options.map(({ value, text }, index) => (
          <option key={index} value={value}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
};
