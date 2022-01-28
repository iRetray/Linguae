import React from "react";

import Image from "next/image";

export default function DevBox({
  name,
  userName,
  description,
  githubAccount,
  photoPath,
}) {
  return (
    <div className="DevBoxContainer" onClick={() => window.open(githubAccount)}>
      <Image
        className="image"
        src={photoPath}
        alt="Avatar user"
        width={150}
        height={150}
      />
      <div className="information">
        <span className="name">{name}</span>
        <span className="user">@{userName}</span>
        <span className="description">{description}</span>
      </div>
    </div>
  );
}
