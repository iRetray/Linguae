import React from "react";

import { BiArrowBack } from "react-icons/bi";

export default function GoBack({ previousPageName, onClick }) {
  return (
    <div className="GoBackContainer" onClick={onClick}>
      <BiArrowBack size={18} color="#4c5759" />
      <h4 className="backText">
        Go back to <i>{previousPageName}</i>
      </h4>
    </div>
  );
}
