import React, { useState } from "react";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { GoBack } from "../../components";

import unsplashService from "../../services/unsplashService";

import { useForm } from "react-hook-form";
import { BiSearchAlt } from "react-icons/bi";
import { BsFillCheckCircleFill } from "react-icons/bs";

import { collection, addDoc } from "firebase/firestore";
import { useFirestore } from "reactfire";
import Input from "../../components/Input";

const AddContent = () => {
  const firestore = useFirestore();
  const cardsCollection = collection(firestore, "cards");

  const [sentence, setSentence] = useState("");
  const [selectedPicture, setSelectedPicture] = useState("");
  const [imageList, setImageList] = useState(null);

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const searchImage = () => {
    setImageList([]);
    unsplashService.searchByWord(getValues("search")).then(({ response }) => {
      setImageList(response.results);
    });
  };

  const handleClickImage = ({ URL, id }) => {
    setValue("newContent.image", URL);
    setSelectedPicture(id);
  };

  const handleBlurEnglish = (result) => {
    setSentence(result);
  };

  const saveNewContent = () => {
    console.log("holaaaa", getValues("newContent"));

    /*   addDoc(cardsCollection, getValues("newContent"))
      .then(({ id }) => {
        console.log("Document written with ID: ", id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });*/
  };

  return (
    <div className="AddContentContainer">
      <form onSubmit={handleSubmit(saveNewContent)}>
        <Head>
          <title>Linguage | Add content</title>
        </Head>
        <Link href="/platform" passHref={true}>
          <GoBack previousPageName="Platform" />
        </Link>
        <h1>Create new content</h1>
        <div className="formContainer">
          <div className="englishValue inputSection">
            <span className="label">English value</span>
            <Input
              id="englishValue"
              className="margin-r-20"
              placeholder="Value in English"
              handleChangeOnBlur={handleBlurEnglish}
              isTextArea
              register={register}
              errors={errors}
              newContent
            />
            <span className="translatedText" hidden={sentence === ""}>
              {sentence}
              <span
                className="buttonUse"
                onClick={() => {
                  setValue("newContent.spanishValue", sentence);
                }}
              >
                {" "}
                Use this value as Spanish value
              </span>
            </span>
          </div>
          <div className="inputSection">
            <span className="label">Spanish value</span>
            <Input
              id="spanishValue"
              className="margin-r-20"
              placeholder="Value in Spanish"
              isTextArea
              register={register}
              errors={errors}
              newContent
            />
          </div>
          <div className="inputSection">
            <span className="label">Type of word</span>
            <select
              {...register("newContent.type")}
              className="margin-r-20 input"
            >
              <option value="WORD">Word</option>
              <option value="PHRASAL">Phrasal Verb</option>
              <option value="PHRASAL">Idiom</option>
            </select>
          </div>
          <div className="inputSection">
            <span className="label">Search a picture</span>
            <div style={{ display: "flex" }}>
              <Input
                id="search"
                style={{ width: "-webkit-fill-available" }}
                className="margin-r-20"
                placeholder="Search"
                register={register}
                errors={errors}
              />

              <div className="searchButton" onClick={searchImage}>
                <BiSearchAlt className="searchIcon" />
                <span>Search picture</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="imagesGeneralContainer"
          hidden={
            !(imageList && Array.isArray(imageList) && imageList.length >= 1)
          }
        >
          {imageList &&
            Array.isArray(imageList) &&
            imageList.map(({ id, urls }, index) => (
              <div
                key={index}
                className={
                  selectedPicture === id
                    ? "imageContainer selected"
                    : "imageContainer"
                }
                onClick={() => handleClickImage({ URL: urls.regular, id })}
              >
                <div className="checkIcon" hidden={selectedPicture !== id}>
                  <BsFillCheckCircleFill color="#004e89" />
                </div>
                <Image
                  src={`/api/imageProxy?url=${encodeURIComponent(
                    urls.regular
                  )}`}
                  width="1000px"
                  height="800px"
                  objectFit="cover"
                  alt="Searched image"
                />
              </div>
            ))}
        </div>
        <div className="centerButton">
          <button type="submit" className="button-blue">
            Save new word
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContent;
