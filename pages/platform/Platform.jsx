import React from "react";

import Head from "next/head";
import Link from "next/link";

import { collection, query } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

import { Card, GoBack } from "../../components";

export default function Platform() {
  const firestore = useFirestore();
  const cardsCollection = collection(firestore, "cards");
  const cardsQuery = query(cardsCollection);

  const { status, data: cardList } = useFirestoreCollectionData(cardsQuery);

  if (status === "loading") {
    /* Redesign the loading screen */
    return <span>Loading firebase collection...</span>;
  }

  return (
    <div className="PlatformContainer">
      <Head>
        <title>Linguage | Platform</title>
      </Head>
      <Link href="/" passHref={true}>
        <GoBack previousPageName="Home" />
      </Link>
      <h1>Community words</h1>
      <div className="cardSection">
        {cardList.map((values, index) => (
          <Card key={index} {...values} />
        ))}
      </div>
    </div>
  );
}
