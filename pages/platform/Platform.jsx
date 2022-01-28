import React from "react";

import Head from "next/head";
import Link from "next/link";

import Card from "../../components/Card";
import GoBack from "../../components/GoBack";

import cardList from "../card.json";

export default function Platform() {
  return (
    <div className="PlatformContainer">
      <Head>
        <title>Linguage | Platform</title>
      </Head>
      <Link href="/" passHref={true}>
        <GoBack previousPageName="Home" />
      </Link>
      <h1>Linguae Platform</h1>
      <div className="cardSection">
        {cardList.map((values, index) => (
          <Card key={index} {...values} />
        ))}
      </div>
    </div>
  );
}
