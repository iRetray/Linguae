import React from "react";

import Head from "next/head";
import Link from "next/link";

import { collection, query } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

import { Card, GoBack, Loader } from "../../components";

export default function Platform() {
  const firestore = useFirestore();
  const cardsCollection = collection(firestore, "cards");
  const cardsQuery = query(cardsCollection);

  const { status, data: cardList } = useFirestoreCollectionData(cardsQuery);

  return (
    <div className="PlatformContainer">
      <Head>
        <title>Linguage | Platform</title>
      </Head>
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
    </div>
  );
}
