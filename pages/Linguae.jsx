import React, { Fragment } from "react";

import Link from "next/link";
import { NextSeo } from "next-seo";

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
    <Fragment>
      <NextSeo
        title="Linguae"
        description="Learn and practice your english sharing your knowledge with the community"
        openGraph={{
          type: "website",
          url: "https://linguae.vercel.app/",
          title: "Linguae",
          description:
            "Learn and practice your english sharing your knowledge with the community",
          images: [
            {
              url: "https://firebasestorage.googleapis.com/v0/b/linguae-a0c8d.appspot.com/o/linguaePage.png?alt=media&token=855d17c9-9178-40bc-a438-ed1be997bdbd",
              width: 938,
              height: 507,
              alt: "Linguae homepage",
            },
          ],
        }}
      />
      <div className="LinguaeContainer">
        <div className="ContentsContainer">
          <div className="logoImage">
            <Image
              loading="eager"
              src={introLogo}
              alt="Picture of the author"
            />
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
                <Image loading="eager" src={github} alt="GitHub Project" />
              </div>
              <span>Linguae project v2.3.7</span>
            </div>
          </a>
          <a href="https://www.freepik.es/">
            <div className="freepikContrubutor">
              <div className="logo">
                <Image loading="eager" src={freepik} alt="Frepik website" />
              </div>
              <span>Multimedia contents provider</span>
            </div>
          </a>
        </div>
      </div>
    </Fragment>
  );
}
