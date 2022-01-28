import React from "react";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import DevBox from "../components/DevBox";
import Button from "../components/Button";

import { HiCode } from "react-icons/hi";
import { BsTranslate, BsGear } from "react-icons/bs";
import { VscChevronDown } from "react-icons/vsc";
import devsList from "./devs.json";

export default function Linguae() {
  return (
    <div className="LinguaeContainer">
      <Head>
        <title>Linguae</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="headerMenu">
        <div>
          <Image
            className="image"
            src="/images/rosa.jpg"
            alt="Avatar user"
            width={30}
            height={30}
          />
        </div>
        <div className="iconsHeader">
          <BsGear />
          <VscChevronDown />
        </div>
      </div>
      <h1>
        Welcome to <span className="appName">Linguae</span>
      </h1>
      <span className="version">
        Version: <strong>0.2.12 alpha</strong>
      </span>
      <div className="buttonsSection">
        <Link href="/platform" passHref={true}>
          <Button
            type="secondary"
            text="Linguae Platform"
            icon={<BsTranslate />}
          />
        </Link>
        <Link href="/devsDashboard" passHref={true}>
          <Button text="Dashboard for devs" icon={<HiCode />} />
        </Link>
      </div>
      <div className="devsContainer">
        <h2>Meet our dev team</h2>
        <div className="devsSection">
          {devsList.map((dev, index) => (
            <DevBox key={index} {...dev} />
          ))}
        </div>
      </div>
      <div className="nextFeaturesContainer">
        <h2>Next features</h2>
        <ul>
          <li>
            Shared dashboard for the devs{" "}
            <span className="annotation">Julian is working on this</span>
          </li>
          <li>Homescreen with main features</li>
        </ul>
      </div>
    </div>
  );
}
