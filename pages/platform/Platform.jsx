import React, { Fragment, useContext, useState } from "react";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { UserContext } from "../../contexts";
import { collection, query } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

import { BiImageAdd } from "react-icons/bi";
import { Card, GoBack, Loader, Header, Modal } from "../../components";
import CreateAccount from "./CreateAccount";

export default function Platform() {
  const router = useRouter();
  const [userState] = useContext(UserContext);

  const [modalCreateAccount, setModalCreateAccount] = useState({
    isVisible: false,
  });

  const firestore = useFirestore();
  const cardsCollection = collection(firestore, "cards");
  const cardsQuery = query(cardsCollection);

  const { status, data: cardList } = useFirestoreCollectionData(cardsQuery);

  const showConfirm = () => {
    if (!userState.isLogged) {
      setModalCreateAccount({ isVisible: true });
    } else {
      router.push("/addContent");
    }
  };

  return (
    <Fragment>
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
      {modalCreateAccount.isVisible && (
        <Modal>
          <CreateAccount
            closeModal={() => setModalCreateAccount({ isVisible: false })}
          />
        </Modal>
      )}
    </Fragment>
  );
}
