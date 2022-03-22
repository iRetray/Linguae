import React from "react";

import Image from "next/image";

import { VscWholeWord } from "react-icons/vsc";
import { FaRegCommentDots } from "react-icons/fa";
import { BsBookmarks } from "react-icons/bs";

export const BigCard = ({ englishValue, spanishValue, image, owner }) => {
  return (
    <div className="BigCardContainer">
      <div className="imageCard">
        <Image
          src={`/api/imageProxy?url=${encodeURIComponent(image)}`}
          width="800px"
          height="800px"
          objectFit="cover"
          alt="Related word image"
        />
      </div>
      <div className="textsContainer">
        <div className="textObject">
          <div className="icon">
            <VscWholeWord />
          </div>
          <div>
            <p className="subtitle">Word</p>
            <p className="englishValueText">{englishValue}</p>
          </div>
        </div>
        <div className="textObject">
          <div className="icon">
            <FaRegCommentDots />
          </div>
          <div>
            <p className="subtitle">
              <strong>{owner || "The owner "}</strong> define it as
            </p>
            <p className="spanishValueText">{spanishValue}</p>
          </div>
        </div>
        <div className="textObject">
          <div className="icon">
            <BsBookmarks />
          </div>
          <div>
            <p className="subtitle">
              <strong>The dictionary</strong> define it as
            </p>
            <p className="dictionaryText">{spanishValue}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
