import React, { useContext } from "react";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { collection, query } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

import { notification } from "antd";
import { BiImageAdd } from "react-icons/bi";
import { Card, GoBack, Loader, Header } from "../../components";

import { UserContext } from "../../contexts";
import CreateAccount from "./CreateAccount";

export default function Platform() {
  const key = "modalCreateAccount";
  const firestore = useFirestore();
  const cardsCollection = collection(firestore, "cards");
  const cardsQuery = query(cardsCollection);
  const router = useRouter();
  const [userState] = useContext(UserContext);

  const { status, data: cardList } = useFirestoreCollectionData(cardsQuery);

  const closeModal = () => {
    notification.close(key);
  };

  const showConfirm = () => {
    if (!userState.isLogged) {
      notification.open({
        description: <CreateAccount closeModal={closeModal} />,
        key,
        duration: 0,
      });
    } else {
      router.push("/addContent");
    }
  };

  return (
    <div className="PlatformContainer">
      <Head>
        <title>Linguage | Platform</title>
      </Head>
      <Header />
      <Link href="/" passHref={true}>
        <GoBack previousPageName="Home" />
      </Link>
      <h1>Community words</h1>
      {status === "loading" ? (
        <Loader text="Getting latest cards..." color="#004e89" />
      ) : (
        <div className="cardSection">
          {cardList.map((values, index) => (
            <Card key={index} {...values} />
          ))}
        </div>
      )}
      <div className="addContentContainer" onClick={showConfirm}>
        <BiImageAdd className="addIcon" />
        <span>Add content</span>
      </div>
    </div>
  );
}
