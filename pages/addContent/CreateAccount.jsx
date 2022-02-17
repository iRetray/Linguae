import React from "react";

import Image from "next/image";

import googleIcon from "../../public/images/google.png";

const CreateAccount = () => {
  return (
    <div className="createAccountSection">
      <p className="message">
        Do you want to<strong> create new contents?</strong>
      </p>
      <div className="googleLoginContainer">
        <div className="googleIcon">
          <Image src={googleIcon} alt="Related word image" />
        </div>

        <span>Create account with Google </span>
      </div>
    </div>
  );
};

export default CreateAccount;
