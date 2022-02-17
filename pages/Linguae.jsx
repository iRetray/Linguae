import React from "react";

import Head from "next/head";
import Link from "next/link";

import { BsFillPlayFill } from "react-icons/bs";

import { Button, FeatureCard, Line } from "../components";
import Image from "next/image";

import introLogo from "../public/images/introLogo.png";
import book from "../public/images/book.png";
import share from "../public/images/share.png";
import peopleTalking from "../public/images/peopleTalking.png";
import github from "../public/images/github.png";
import freepik from "../public/images/freepik.svg";

export default function Linguae() {
  return (
    <div className="LinguaeContainer">
      <Head>
        <title>Linguae</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Linguae" />
        <meta
          property="og:description"
          content="Learn and practice your english sharing your knowledge with the community"
        />
        <meta property="og:url" content="https://linguae.vercel.app/" />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/linguae-a0c8d.appspot.com/o/linguaePage.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="938" />
        <meta property="og:image:height" content="507" />
      </Head>
      <div className="ContentsContainer">
        <div className="logoImage">
          <Image src={introLogo} alt="Picture of the author" />
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
      <Line />
      <div className="FeaturesSection">
        <FeatureCard
          imageObject={book}
          title="Learn new words everyday"
          description="Phrasal verbs, idioms and native expressions"
        />
        <FeatureCard
          imageObject={share}
          title="Contribute to the community"
          description="Be part of the shared knowledge"
        />
        <FeatureCard
          imageObject={peopleTalking}
          title="Improve your english skills"
          description="Continuous and personalized learning"
        />
      </div>
      <div className="FooterContainer">
        <a href="https://github.com/iRetray/Linguae">
          <div className="githubProject">
            <div className="imageContainer">
              <Image src={github} alt="GitHub Project" />
            </div>
            <span>Linguae project v0.6.2</span>
          </div>
        </a>
        <a href="https://www.freepik.es/">
          <div className="freepikContrubutor">
            <div className="logo">
              <Image src={freepik} alt="Frepik website" />
            </div>
            <span>Multimedia contents provider</span>
          </div>
        </a>
      </div>
    </div>
  );
}
