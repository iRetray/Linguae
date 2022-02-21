import React, { useContext } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import { UserContext } from "../../contexts";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import googleIcon from "../../public/images/google.png";

const CreateAccount = ({ closeModal }) => {
  const [, UserDispatch] = useContext(UserContext);

  const router = useRouter();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    closeModal();
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        UserDispatch({
          type: "SET_USER_LOGGED",
          payload: {
            isLogged: true,
            ...user,
          },
        });
        router.push("/addContent");
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  return (
    <div className="createAccountSection" onClick={signInWithGoogle}>
      <p className="message">
        Do you want to<strong> create new contents?</strong>
      </p>
      <div className="googleLoginContainer">
        <div className="googleIcon">
          <Image src={googleIcon} alt="Related word image" />
        </div>
        <span>Create account with Google</span>
      </div>
    </div>
  );
};

export default CreateAccount;
