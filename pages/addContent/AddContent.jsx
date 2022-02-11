import React, { useEffect, useState } from "react";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { GoBack } from "../../components";

import unsplashService from "../../services/unsplashService";
import { useForm } from "react-hook-form";
import { BiSearchAlt } from "react-icons/bi";

import { collection, addDoc } from "firebase/firestore";
import { useFirestore } from "reactfire";

const AddContent = () => {
  const firestore = useFirestore();
  const cardsCollection = collection(firestore, "cards");
  const [imageList, setImageList] = useState(null);

  const { register, getValues, setValue } = useForm();

  const searchImage = () => {
    setImageList([]);
    unsplashService.searchByWord(getValues("search")).then(({ response }) => {
      setImageList(response.results);
    });
  };

  const handleClickImage = (url) => {
    setValue("newContent.image", url);
  };

  const handleChangeEnglish = (word) => {
    console.log(word);
  };

  const saveNewContent = () => {
    addDoc(cardsCollection, getValues("newContent"))
      .then(({ id }) => {
        console.log("Document written with ID: ", id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <div className="AddContentContainer">
      <Head>
        <title>Linguage | Add content</title>
      </Head>
      <Link href="/platform" passHref={true}>
        <GoBack previousPageName="Platform" />
      </Link>
      <h1>Create new content</h1>
      <div style={{ margin: "20px", fontSize: "20px" }}>
        <strong>This section is in progress yet, take a look later!</strong> 😉
      </div>
      <div className="formContainer">
        <div className="flex flex-start">
          <input
            {...register("newContent.englishValue")}
            id="englishValue"
            className="margin-r-20 input"
            placeholder="Value in English"
          />
          <input
            {...register("newContent.spanishValue")}
            id="spanishValue"
            className="margin-r-20 input"
            placeholder="Value in Spanish"
          />
          <select
            {...register("newContent.type")}
            className="margin-r-20 input"
          >
            <option value="WORD">Word</option>
            <option value="PHRASAL">Phrasal Verb</option>
          </select>
        </div>
        <div className="flex">
          <input
            {...register("search")}
            id="search"
            placeholder="Search"
            className="input"
          />
          <div className="searchButton" onClick={searchImage}>
            <BiSearchAlt className="searchIcon" />
          </div>
        </div>
      </div>
      <div>
        <button className="button-blue" onClick={saveNewContent}>
          Save
        </button>
      </div>

      <div className="imagesGeneralContainer">
        {imageList &&
          Array.isArray(imageList) &&
          imageList.map(({ urls }, index) => (
            <div
              key={index}
              className="imageContainer"
              onClick={() => handleClickImage(urls.regular)}
            >
              <Image
                src={`/api/imageProxy?url=${encodeURIComponent(urls.regular)}`}
                blurDataURL={`/api/imageProxy?url=${encodeURIComponent(
                  urls.regular
                )}`}
                placeholder="blur"
                width="800px"
                height="800px"
                objectFit="cover"
                alt="Searched image"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddContent;
