import React from "react";

import { BiArrowBack } from "react-icons/bi";

/* eslint-disable no-unused-vars */
export const GoBack = React.forwardRef(function GoBack(
  { previousPageName, onClick },
  ref
) {
  return (
    <div className="GoBackContainer" onClick={onClick}>
      <BiArrowBack size={18} color="#4c5759" />
      <h4 className="backText">
        Go back to <i>{previousPageName}</i>
      </h4>
    </div>
  );
});
