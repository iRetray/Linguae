import React from "react";

export default function Video({ mediaEncode }) {
  return (
    <div className="mediaEncoder">
      <video className="video" src={mediaEncode} controls={true} width="300" />
    </div>
  );
}
