import React, { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

/* import copy from "copy-to-clipboard"; */
import { Tooltip, Popover } from "antd";
import { HiOutlineClipboardCopy } from "react-icons/hi";

const UserMiniCard = ({ username, avatar }) => (
  <div className="UserMiniCardContainer">
    <div className="avatar">
      <Image
        loading="eager"
        src={`/api/imageProxy?url=${encodeURIComponent(avatar)}`}
        width="30px"
        height="30px"
        objectFit="cover"
        alt="Related word image"
      />
    </div>
    <p>{username}</p>
  </div>
);

export function Card({ id, englishValue, spanishValue, image, owner, avatar }) {
  const router = useRouter();
  const [textCopy, setTextCopy] = useState("Click to copy!");

  const copyToWord = () => {
    navigator.clipboard.writeText(englishValue);
    setTextCopy("Word copied!");
  };

  const goToCardPage = () => {
    router.replace({
      pathname: "card/[id]",
      query: { id },
    });
  };

  return (
    <div className="cardContainer">
      <div className="imageCard" onClick={goToCardPage}>
        <Image
          src={`/api/imageProxy?url=${encodeURIComponent(image)}`}
          width="800px"
          height="800px"
          objectFit="cover"
          alt="Related word image"
        />
      </div>
      <div className="informationContainer">
        <div className="miniCardContainer">
          <Tooltip title={textCopy} color="purple">
            <div
              className="wordContainer"
              onMouseOver={() => {
                setTextCopy("Click to copy!");
              }}
              onClick={copyToWord}
            >
              <span>{englishValue}</span>
              <HiOutlineClipboardCopy />
            </div>
          </Tooltip>
          <span className="definition">{spanishValue}</span>
        </div>
      </div>
      {owner && (
        <div className="avatarImage">
          <Popover
            title=""
            content={<UserMiniCard username={owner} avatar={avatar} />}
          >
            <Image
              loading="eager"
              src={`/api/imageProxy?url=${encodeURIComponent(avatar)}`}
              width="30px"
              height="30px"
              objectFit="cover"
              alt="Related word image"
            />
          </Popover>
        </div>
      )}
    </div>
  );
}
