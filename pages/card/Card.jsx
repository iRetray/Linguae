import React, { Fragment, useEffect, useState } from "react";

import { NextSeo } from "next-seo";

import { useRouter } from "next/router";

import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection, query, where } from "firebase/firestore";

import { Card as CardComponent } from "../../components";

import { v4 as uuidv4 } from "uuid";

const defaultSiteDescription =
  "Learn and practice your english sharing your knowledge with the community";

const Card = () => {
  const router = useRouter();
  const { cardId } = router.query;

  const [card, setCard] = useState();

  const firestore = useFirestore();
  const cardsCollection = collection(firestore, "cards");
  const cardsQuery = query(cardsCollection, where("id", "==", cardId || ""));
  const { status, data: cardListUser } = useFirestoreCollectionData(cardsQuery);

  useEffect(() => {
    console.log(uuidv4());
    if (cardListUser) {
      setCard(cardListUser[0]);
    }
  }, [cardListUser]);

  return (
    <Fragment>
      <NextSeo
        title={card ? `Linguae | ${card.englishValue}` : "Linguae"}
        description={card ? card.spanishValue : defaultSiteDescription}
        openGraph={{
          type: "website",
          url: `https://linguae.vercel.app/card/${cardId}`,
          title: card ? `Linguae | ${card.englishValue}` : "Linguae",
          description: card ? card.spanishValue : defaultSiteDescription,
          images: [
            {
              url: card
                ? card.image
                : "https://firebasestorage.googleapis.com/v0/b/linguae-a0c8d.appspot.com/o/linguaePage.png?alt=media&token=855d17c9-9178-40bc-a438-ed1be997bdbd",
              width: 938,
              height: 507,
              alt: card ? `Linguae | ${card.englishValue}` : "Linguae",
            },
          ],
        }}
      />
      {status === "loading" ? (
        <div>Cargando</div>
      ) : card ? (
        <CardComponent {...card} />
      ) : (
        <div>
          <p>No se ha encontrado la card</p>
        </div>
      )}
    </Fragment>
  );
};

export default Card;
