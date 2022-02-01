import React from "react";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { BsFillPlayFill } from "react-icons/bs";

import Button from "../components/Button";

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
          <p className="title">
            Linguae<span className="version"> 0.2.12 alpha</span>
          </p>
          <p className="description">
            Learn and practice your english
            <strong> sharing your knowledge</strong> with the community
          </p>
          <Link href="/platform" passHref={true}>
            <Button text="Let's get started!" icon={<BsFillPlayFill />} />
          </Link>
        </div>
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
