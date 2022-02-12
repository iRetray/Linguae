import React, { useContext, useState } from "react";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { GoBack } from "../../components";

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

  const { register, getValues, setValue } = useForm();

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

  const handleBlurEnglish = ({ target }) => {
    if (target.value !== "") {
      translateService.translate(target.value).then(({ translatedText }) => {
        setSentence(translatedText);
      });
    } else {
      setSentence("");
    }
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
      {userState.isLogged ? (
        <>
          <div className="formContainer">
            <div className="englishValue inputSection">
              <span className="label">English value</span>
              <textarea
                {...register("newContent.englishValue")}
                id="englishValue"
                autoComplete="off"
                className="input"
                placeholder="Value in English"
                onBlur={handleBlurEnglish}
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
              <textarea
                {...register("newContent.spanishValue")}
                id="spanishValue"
                autoComplete="off"
                className="input"
                placeholder="Value in Spanish"
              />
            </div>
            <div className="inputSection">
              <span className="label">Type of word</span>
              <select {...register("newContent.type")} className="input">
                <option value="WORD">Word</option>
                <option value="PHRASAL">Phrasal Verb</option>
                <option value="PHRASAL">Idiom</option>
              </select>
            </div>
            <div className="inputSection">
              <span className="label">Search a picture</span>
              <div style={{ display: "flex" }}>
                <input
                  {...register("search")}
                  style={{ width: "-webkit-fill-available" }}
                  id="search"
                  autoComplete="off"
                  placeholder="Search"
                  className="input"
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
            <button className="button-blue" onClick={saveNewContent}>
              Save new word
            </button>
          </div>
        </>
      ) : (
        <div className="createAccountSection">
          <GrLogin className="userIcon" />
          <span className="textContents">
            <p className="message">
              Do you want to<strong> create new contents?</strong>
            </p>
            <div className="links">
              <Link href="/createAccount" passHref={true}>
                <span className="link">Create new account</span>
              </Link>{" "}
              or{" "}
              <Link href="/login" passHref={true}>
                <span className="link">Login</span>
              </Link>
            </div>
          </span>
        </div>
      )}
    </div>
  );
};

export default AddContent;
