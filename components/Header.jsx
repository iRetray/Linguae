import React, { useContext } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import { getAuth } from "firebase/auth";

import { Popover, Badge } from "antd";
import { CgLogOut, CgProfile } from "react-icons/cg";

import { UserContext } from "../contexts";

const CloseSession = () => {
  const auth = getAuth();
  const router = useRouter();
  const [, UserDispatch] = useContext(UserContext);

  const goToMyProfile = () => {
    router.replace("/profile");
  };

  const closeSession = () => {
    auth
      .signOut()
      .then(() => {
        UserDispatch({ type: "LOGOUT" });
        router.replace("/platform");
        console.info("Session closed succesfully");
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  return (
    <div className="PopoverContainer">
      <div onClick={goToMyProfile} className="miProfile">
        <CgProfile />
        <span>Mi profile</span>
      </div>
      <hr />
      <div onClick={closeSession} className="closeSessionButton">
        <CgLogOut />
        <span>Close session</span>
      </div>
    </div>
  );
};

export const Header = () => {
  const router = useRouter();
  const [userState] = useContext(UserContext);

  return (
    <div className="HeaderContainer">
      <div className="LinguaeTitle" onClick={() => router.replace("/")}>
        Linguae
      </div>
      <div className="userContainer" hidden={!userState.isLogged}>
        <div className="textsContainer">
          <p className="name">{userState.displayName}</p>
          <p className="email">{userState.email}</p>
        </div>
        <Popover
          placement="bottomRight"
          content={<CloseSession />}
          trigger="click"
        >
          <Badge style={{ marginTop: "10px" }} count={12} color="geekblue">
            <div className="imageProfile" hidden={!userState.photoURL}>
              <Image
                loading="eager"
                src={`/api/imageProxy?url=${encodeURIComponent(
                  userState.photoURL
                )}`}
                width="50px"
                height="50px"
                objectFit="cover"
                alt="Related word image"
              />
            </div>
          </Badge>
        </Popover>
      </div>
    </div>
  );
};
