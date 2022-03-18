import React, { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

/* import copy from "copy-to-clipboard"; */
import { Tooltip } from "antd";

export function Card({ id, englishValue, spanishValue, image, owner, avatar }) {
  const router = useRouter();
  const [textCopy, setTextCopy] = useState("Click to copy!");

  /* const copyToWord = () => {
    copy(englishValue);
    setTextCopy("Word copied!");
  }; */

  const goToCardPage = () => {
    router.push({
      pathname: "card/[id]",
      query: { id },
    });
  };

  return (
    <Tooltip title={textCopy} color="purple">
      <div
        className="CardContainer"
        onClick={goToCardPage}
        onMouseOver={() => {
          setTextCopy("Click to copy!");
        }}
      >
        {owner && (
          <div className="ownerSection">
            <div className="avatarImage">
              <Image
                loading="eager"
                src={`/api/imageProxy?url=${encodeURIComponent(avatar)}`}
                width="30px"
                height="30px"
                objectFit="cover"
                alt="Related word image"
              />
            </div>
            <p className="ownerName">
              <p>Created by</p>
              <p>
                <strong>{owner}</strong>
              </p>
            </p>
          </div>
        )}
        <div className="informationContainer">
          <div className="miniCardContainer">
            <span className="wordContainer">{englishValue}</span>
            <span className="definition">{spanishValue}</span>
          </div>
        </div>
        <div className="imageCard">
          <Image
            src={`/api/imageProxy?url=${encodeURIComponent(image)}`}
            width="800px"
            height="800px"
            objectFit="cover"
            alt="Related word image"
          />
        </div>
      </div>
    </Tooltip>
  );
}
