import Image from "next/image";
import React from "react";

/* import { Popover } from "antd" */
import { AiFillStar } from "react-icons/ai";

import { Button } from ".";

export function Card({ type, englishValue, spanishValue, image }) {
  return (
    <div className="CardContainer">
      <div className="informationContainer">
        <div className="header">
          <p className="type">{type}</p>
          <Button
            text="Favorite"
            isSmall={true}
            icon={<AiFillStar className="star" />}
          />
        </div>
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
  );
}
