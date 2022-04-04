import React, { useContext, useState, useEffect } from "react";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { UserContext } from "../../contexts";

import { collection, query } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

import { ContentLayout } from "../../layouts";
import { Card, GoBack, Loader, Header, Modal } from "../../components";
import CreateAccount from "./CreateAccount";

import { BiImageAdd, BiSearchAlt } from "react-icons/bi";
BiSearchAlt;
import { Input } from "antd";

export default function Platform() {
  const router = useRouter();
  const [userState] = useContext(UserContext);

  const firestore = useFirestore();
  const cardsCollection = collection(firestore, "cards");
  const cardsQuery = query(cardsCollection);

  const { status, data: cardList } = useFirestoreCollectionData(cardsQuery);

  const [modalCreateAccount, setModalCreateAccount] = useState({
    isVisible: false,
  });
  const [dataForSearch, setDataForSearch] = useState([]);

  useEffect(() => {
    if (!Array.isArray(cardList)) {
      return "loading";
    }
    setDataForSearch(cardList);
  }, [cardList]);

  const showConfirm = () => {
    if (!userState.isLogged) {
      setModalCreateAccount({ isVisible: true });
    } else {
      router.replace("/addContent");
    }
  };

  const searchWord = (e) => {
    const word = e.target.value.toLowerCase();
    const result = cardList.filter((el) =>
      el.englishValue.toLowerCase().includes(word)
    );
    setDataForSearch(result);
  };

  return (
    <ContentLayout>
      <div className="PlatformContainer">
        <Head>
          <title>Linguage | Platform</title>
        </Head>
        <Header />
        <Link href="/" passHref={true}>
          <GoBack previousPageName="Home" />
        </Link>
        <div className="headerPlatform">
          <h1>Community words</h1>
          <Input
            placeholder="Search"
            suffix={<BiSearchAlt />}
            onChange={searchWord}
            style={{ width: "auto" }}
          />
        </div>
        {status === "loading" ? (
          <Loader text="Getting latest cards..." color="#004e89" />
        ) : (
          <div className="cardSection">
            {dataForSearch?.map((values, index) => (
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
    </ContentLayout>
  );
}
