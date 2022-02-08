import React, { useState } from "react";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { GoBack } from "../../components";

import unsplashService from "../../services/unsplashService";

import { Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { BiSearchAlt } from "react-icons/bi";

const AddContent = () => {
  const [imageList, setImageList] = useState(null);
  const {
    register,
    handleSubmit,
    /* formState: { errors, isValid }, */
    getValues,
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const searchImage = () => {
    setImageList([]);
    unsplashService.searchByWord(getValues("search")).then(({ response }) => {
      setImageList(response.results);
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
      <div className="formContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputForm">
            <Input
              {...register("search")}
              id="englishValue"
              label="Search by word"
              shadow={false}
              size="md"
              bordered
              animated={false}
            />
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
            <div key={index} className="imageContainer">
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
