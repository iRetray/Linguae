import React from "react";

const FeatureCard = ({ imageURL, title, description }) => {
  return (
    <div className="FeatureContainer">
      <img src={imageURL} className="image" />
      <div className="textContents">
        <p className="title">{title}</p>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
