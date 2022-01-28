import React from "react";

/* import { Popover } from "antd" */
import { AiFillStar } from "react-icons/ai";

import Video from "./Video";
import Button from "./Button";

export default function Card({
  type,
  englishValue,
  spanishValue,
  mediaEncode,
}) {
  return (
    <div className="CardContainer">
      <div className="informationContainer">
        <div className="header">
          <p className="type">{type}</p>
          <div>
            <Button
              text="Favorito"
              type="secondary"
              isSmall={true}
              isYellow={true}
              icon={<AiFillStar className="star" />}
            />
          </div>
        </div>
        <div className="miniCardContainer">
          <span className="wordContainer">{englishValue}</span>
          <span className="definition">{spanishValue}</span>
        </div>
      </div>
      {/* <div className="favorite">
        <Popover
          placement="rightTop"
          title={englishValue}
          content={<Video mediaEncode={mediaEncode} />}
          trigger="click"
        >
          <AiFillPlayCircle className="video_link" />
        </Popover>
      </div> */}
      <div className="mediaEncoder">
        <Video mediaEncode={mediaEncode} />
      </div>
    </div>
  );
}
