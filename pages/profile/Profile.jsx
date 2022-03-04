import React, { Fragment, useContext, useEffect } from "react";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import moment from "moment";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection, query, where } from "firebase/firestore";

import { HiOutlineMail } from "react-icons/hi";
import { RiUserHeartLine } from "react-icons/ri";

import { Card, GoBack, Header, Line, Loader } from "../../components";

import { UserContext } from "../../contexts";

const Profile = () => {
  const [userState] = useContext(UserContext);
  const firestore = useFirestore();
  const cardsCollection = collection(firestore, "cards");
  const cardsQuery = query(
    cardsCollection,
    where("owner", "==", userState.displayName || "")
  );
  const { status, data: cardListUser } = useFirestoreCollectionData(cardsQuery);

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
        <div className="headerProfileContainer">
          <div className="headerProfileContent">
            <div className="profilePicture">
              {console.log("dfd", userState)}
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
              <div className="userName font-bold">
                <span>{userState.displayName}</span>
              </div>
              <div className="email">
                <HiOutlineMail />
                <span>{userState.email}</span>
              </div>
              <div className="userSince">
                <RiUserHeartLine />
                <p className="title">
                  <strong>Account created:</strong>
                  <span>
                    {moment(parseInt(userState.metadata?.createdAt)).fromNow()}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="aditionalData">
            <div className="oneDate">
              <p className="title">Last login:</p>
              <p className="time">
                {moment(parseInt(userState.metadata?.lastLoginAt)).format(
                  "LLLL"
                )}
              </p>
            </div>
            <div className="oneDate">
              <p className="title">Account created at:</p>
              <p className="time">
                {moment(parseInt(userState.metadata?.createdAt)).format("LLLL")}
              </p>
            </div>
          </div>
        </div>
        <Line />
        <div>
          {status === "loading" ? (
            <Loader text="Getting latest cards for user..." color="#004e89" />
          ) : (
            <div className="cardSection flex flex-center">
              {cardListUser.map((values, index) => (
                <Card key={index} {...values} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
