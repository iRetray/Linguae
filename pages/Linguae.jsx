import React from "react";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { BsFillPlayFill } from "react-icons/bs";

import Button from "../components/Button";
import FeatureCard from "../components/FeatureCard";

export default function Linguae() {
  return (
    <div className="LinguaeContainer">
      <Head>
        <title>Linguae</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="ContentsContainer">
        <div className="logoImage">
          <Image src="/images/introLogo.jpg" width={800} height={710} />
        </div>
        <div className="textContainer">
          <p className="title">Linguae</p>
          <p className="description">
            Learn and practice your english
            <strong> sharing your knowledge</strong> with the community
          </p>
          <Link href="/platform" passHref={true}>
            <Button text="Let's get started!" icon={<BsFillPlayFill />} />
          </Link>
        </div>
      </div>
      <div className="FeaturesSection">
        <FeatureCard
          imageURL="/images/book.png"
          title="Learn new words everyday"
          description="Phrasal verbs, idioms and native expressions"
        />
        <FeatureCard
          imageURL="/images/share.png"
          title="Contribute to the community"
          description="Be part of the shared knowledge"
        />
        <FeatureCard
          imageURL="/images/book.png"
          title="Improve your english skills"
          description="Continuous and personalized learning"
        />
      </div>
      <div className="FooterContainer">
        <a href="https://www.freepik.es/">
          <div className="freepikContrubutor">
            <Image
              className="logo"
              src="/images/freepik.svg"
              width={50}
              height={50}
            />
            <span>Multimedia contents provider</span>
          </div>
        </a>
      </div>
    </div>
  );
}
