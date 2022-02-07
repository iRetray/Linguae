import Image from "next/image";
import React from "react";

export const FeatureCard = ({ imageObject, title, description }) => {
  return (
    <div className="FeatureContainer">
      <div className="image">
        <Image src={imageObject} alt="Feature image" />
      </div>
      <div className="textContents">
        <p className="title">{title}</p>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};
