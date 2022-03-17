import { listAll } from "firebase/storage";
import Image from "next/image";
import React, { useState } from "react";
import copy from "copy-to-clipboard";
import { Tooltip } from "antd";

/* import { Popover } from "antd" */
/* import { AiFillStar } from "react-icons/ai";

import { Button } from "."; */

export function Card({
  /* type, */
  englishValue,
  spanishValue,
  image,
  owner,
  avatar,
}) {
  const [textCopy, setTextCopy] = useState("Click to copy!");
  const copyToWord = () => {
    copy(englishValue);
    setTextCopy("Word copied!");
  };
  return (
    <Tooltip title={textCopy} color="purple">
      <div
        className="CardContainer"
        onClick={copyToWord}
        onMouseOver={() => {
          setTextCopy("Click to copy!");
        }}
      >
        <div className="ownerSection" hidden={!owner}>
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
        <div className="informationContainer">
          {/* <div className="header">
          <p className="type">{type}</p>
          <Button
            text="Favorite"
            isSmall={true}
            icon={<AiFillStar className="star" />}
          />
        </div> */}
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
