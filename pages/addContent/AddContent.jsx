import React, { useContext, useState } from "react";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { GoBack, Input, Select } from "../../components";

import { UserContext } from "../../contexts";
import unsplashService from "../../services/unsplashService";
import translateService from "../../services/translateService";

import { useForm } from "react-hook-form";
import { BiSearchAlt } from "react-icons/bi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { GrLogin } from "react-icons/gr";

import { collection, addDoc } from "firebase/firestore";
import { useFirestore } from "reactfire";

const AddContent = () => {
  const [userState] = useContext(UserContext);

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

  const handleBlurEnglishValue = ({ target }) => {
    if (target.value !== "") {
      translateService.translate(target.value).then(({ translatedText }) => {
        setSentence(translatedText);
      });
    } else {
      setSentence("");
    }
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
              isTextArea
              name="newContent.englishValue"
              placeholder="e.g. Would"
              handleBlur={handleBlurEnglishValue}
              register={register}
              validationSchema={{ required: "This field is required" }}
              errors={errors}
            />
            <span className="translatedText" hidden={sentence === ""}>
              {sentence}
              <span
                className="buttonUse"
                onClick={() => {
                  setValue("newContent.spanishValue", sentence);
                }}
              >
                Use this value as Spanish value
              </span>
            </span>
          </div>
          <div className="inputSection">
            <span className="label">Spanish value</span>
            <Input
              isTextArea
              name="newContent.spanishValue"
              placeholder="e.g. Preferir"
              register={register}
              validationSchema={{ required: "This field is required" }}
              errors={errors}
            />
          </div>
          <div className="inputSection">
            <span className="label">Type of word</span>
            <Select
              options={[
                {
                  value: "WORD",
                  text: "Word",
                },
                {
                  value: "PHRASAL",
                  text: "Phrasal Verb",
                },
                {
                  value: "IDIOM",
                  text: "Idiom",
                },
              ]}
            />
          </div>
          <div className="inputSection">
            <span className="label">Search a picture</span>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Input
                name="search"
                style={{ width: "-webkit-fill-available" }}
                placeholder="e.g. dog in the garden"
                register={register}
                errors={errors}
              />
              <div className="searchButton" onClick={searchImage}>
                <BiSearchAlt className="searchIcon" />
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
