import React, { Fragment, useContext, useEffect } from "react";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import moment from "moment";

import { HiOutlineMail } from "react-icons/hi";

import { GoBack, Header, Line } from "../../components";

import { UserContext } from "../../contexts";

const Profile = () => {
  const [userState] = useContext(UserContext);

  useEffect(() => {
    console.log(
      moment(parseInt(userState.metadata?.lastLoginAt)).format("LLLL")
    );
  }, [userState]);

  return (
    <Fragment>
      <div className="ProfileContainer">
        <Head>
          <title>Linguage | Profile</title>
        </Head>
        <Header />
        <Link href="/" passHref={true}>
          <GoBack previousPageName="" />
        </Link>
        <h1>My Profile</h1>
        <div className="headerProfile">
          <div className="profilePicture">
            <Image
              loading="eager"
              src={`/api/imageProxy?url=${encodeURIComponent(
                userState.photoURL
              )}`}
              width="600px"
              height="600px"
              alt="Related word image"
            />
          </div>
          <div>
            <div className="userName">
              <span>{userState.displayName}</span>
            </div>
            <div className="email">
              <HiOutlineMail />
              <span>{userState.email}</span>
            </div>
          </div>
        </div>
        <Line />
        <div className="aditionalData">
          <div className="oneDate">
            <p className="title">Last login:</p>
            <p className="time">
              {moment(parseInt(userState.metadata?.lastLoginAt)).format("LLLL")}
            </p>
          </div>
          <div className="oneDate">
            <p className="title">Account created at:</p>
            <p className="time">
              {moment(parseInt(userState.metadata?.createdAt)).format("LLLL")}
            </p>
          </div>
          <div className="oneDate">
            <p className="title">You are a Linguae user since:</p>
            {moment(parseInt(userState.metadata?.createdAt)).fromNow()}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
