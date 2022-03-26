import React from "react";

import Image from "next/image";

import { VscWholeWord } from "react-icons/vsc";
import { FaRegCommentDots } from "react-icons/fa";
import { BsBookmarks } from "react-icons/bs";

export const BigCard = ({
  englishValue,
  spanishValue,
  image,
  owner,
  dictionaryMeaning,
}) => {
  return (
    <div className="BigCardContainer">
      <div className="imageCard">
        <Image
          src={`/api/imageProxy?url=${encodeURIComponent(image)}`}
          width="600px"
          height="350px"
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
            <div className="subtitle">
              <strong>The dictionary</strong> define it as
            </div>
            <div className="dictionaryText">
              {dictionaryMeaning &&
                dictionaryMeaning.meanings.map(
                  (
                    { partOfSpeech, synonyms, antonyms, definitions },
                    index
                  ) => (
                    <div className="dictionaryElement" key={index}>
                      <p className="titleSpeech">{partOfSpeech}</p>
                      {definitions.length > 0 && (
                        <div className="containerSpeech">
                          <p className="titleList">Definitions</p>
                          <ul>
                            {definitions.map(
                              ({ definition }, definitionIndex) => (
                                <li
                                  key={definitionIndex}
                                  className="mainMeaning"
                                >
                                  {definition}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                      {synonyms.length > 0 && (
                        <div className="containerSpeech">
                          <p className="titleList">Synonyms</p>
                          <ul>
                            {synonyms.map((synonym, synonymIndex) => (
                              <li key={synonymIndex} className="mainMeaning">
                                {synonym}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {antonyms.length > 0 && (
                        <div className="containerSpeech">
                          <p className="titleList">Antonyms</p>
                          <ul>
                            {antonyms.map((antonym, antonymIndex) => (
                              <li key={antonymIndex} className="mainMeaning">
                                {antonym}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
