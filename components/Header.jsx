import React, { useContext } from "react";

import Image from "next/image";

import { UserContext } from "../contexts";

export const Header = () => {
  const [userState] = useContext(UserContext);

  return (
    <div className="HeaderContainer">
      <div className="LinguaeTitle">Linguae</div>
      <div className="userContainer">
        <div className="textsContainer">
          <p className="name">{userState.displayName}</p>
          <p className="email">{userState.email}</p>
        </div>
        <div className="imageProfile" hidden={!userState.photoURL}>
          <Image
            src={`/api/imageProxy?url=${encodeURIComponent(
              userState.photoURL
            )}`}
            width="50px"
            height="50px"
            objectFit="cover"
            alt="Related word image"
          />
        </div>
      </div>
    </div>
  );
};
