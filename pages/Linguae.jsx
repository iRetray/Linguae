import React from "react";

import Head from "next/head";
import Link from "next/link";

import { BsFillPlayFill } from "react-icons/bs";

import Button from "../components/Button";
import FeatureCard from "../components/FeatureCard";
import Line from "../components/Line";

export default function Linguae() {
  return (
    <div className="LinguaeContainer">
      <Head>
        <title>Linguae</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="ContentsContainer">
        <img src="/images/introLogo.png" className="logoImage" />
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
      <Line />
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
          imageURL="/images/peopleTalking.png"
          title="Improve your english skills"
          description="Continuous and personalized learning"
        />
      </div>
      <div className="FooterContainer">
        <a href="https://github.com/iRetray/Linguae">
          <div className="githubProject">
            <img src="/images/github.png" alt="GitHubLogo" />
            <span>Linguae project v0.3.4</span>
          </div>
        </a>
        <a href="https://www.freepik.es/">
          <div className="freepikContrubutor">
            <img className="logo" src="/images/freepik.svg" />
            <span>Multimedia contents provider</span>
          </div>
        </a>
      </div>
    </div>
  );
}
