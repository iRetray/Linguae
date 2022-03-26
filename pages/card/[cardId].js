import React, { useEffect, useState } from "react";

import Link from "next/link";

import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection, query, where } from "firebase/firestore";

import { BigCard, Loader, Header, GoBack } from "../../components";

import dictionaryService from "../../services/dictionaryService";

import { v4 as uuidv4 } from "uuid";
import { ContentLayout } from "../../layouts/ContentLayout";

const defaultSiteDescription =
  "Learn and practice your english sharing your knowledge with the community";

const Card = () => {
  const router = useRouter();
  const { cardId } = router.query;

  const [card, setCard] = useState();
  const [dictionaryMeaning, setDictionaryMeaning] = useState(null);

  const firestore = useFirestore();
  const cardsCollection = collection(firestore, "cards");
  const cardsQuery = query(cardsCollection, where("id", "==", cardId || ""));
  const { status, data: cardListUser } = useFirestoreCollectionData(cardsQuery);

  useEffect(() => {
    console.log(uuidv4());
    if (cardListUser) {
      setCard(cardListUser[0]);
      getDictionaryMeaning(cardListUser[0].englishValue);
    }
  }, [cardListUser]);

  useEffect(() => {}, []);

  const getDictionaryMeaning = (wordToSearch) => {
    const firstWordOfPhrase = wordToSearch.split(" ")[0].replace(/,/g, "");
    dictionaryService
      .searchWord(firstWordOfPhrase)
      .then((responseDictionary) => {
        setDictionaryMeaning(responseDictionary[0]);
      })
      .catch((error) => {
        console.error("Dictionary error: ", error);
      });
  };

  return (
    <ContentLayout>
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
      <div className="SingleCardContainer">
        <Header />
        <Link href="/platform" passHref={true}>
          <GoBack previousPageName="Platform" />
        </Link>
        {status === "loading" ? (
          <Loader text="Getting card's information..." color="#004e89" />
        ) : card ? (
          <BigCard dictionaryMeaning={dictionaryMeaning} {...card} />
        ) : (
          <p>No se ha encontrado la card</p>
        )}
      </div>
    </ContentLayout>
  );
};

export default Card;
