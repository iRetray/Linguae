import React, { useState } from "react";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { GoBack } from "../../components";

import unsplashService from "../../services/unsplashService";
import { useForm } from "react-hook-form";
import { BiSearchAlt } from "react-icons/bi";

const AddContent = () => {
  const [imageList, setImageList] = useState(null);

  const {
    register,
    handleSubmit,
    /* formState: { errors, isValid }, */
    getValues,
    setValue,
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const searchImage = () => {
    setImageList([]);
    unsplashService.searchByWord(getValues("search")).then(({ response }) => {
      setImageList(response.results);
    });
  };

  const handleClickImage = (url) => {
    setValue("newContent.image", url);
  };

  const saveNewContent = () => {
    console.log(getValues("newContent"));
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
      <div className="formContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputForm">
            <input
              {...register("newContent.englishValue")}
              id="englishValue"
              placeholder="Value in English"
            />

            <input
              {...register("newContent.spanishhValue")}
              id="spanishhValue"
              placeholder="Value in Spanish"
            />

            <select {...register("newContent.type")}>
              <option value="WORD">Word</option>
              <option value="PHRASAL">Phrasal Verb</option>
            </select>

            <input {...register("search")} id="search" placeholder="Search" />

            <div className="searchButton" onClick={searchImage}>
              <BiSearchAlt className="searchIcon" />
            </div>
          </div>
        </form>
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
      <button onClick={saveNewContent}>Save</button>
    </div>
  );
};

export default AddContent;
