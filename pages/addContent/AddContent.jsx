import React, { useContext, useEffect, useState } from "react";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { GoBack, Input, Select, Header } from "../../components";

import unsplashService from "../../services/unsplashService";
import translateService from "../../services/translateService";

import { useForm } from "react-hook-form";
import { BiSearchAlt, BiCloudDownload } from "react-icons/bi";
import { BsFillCheckCircleFill } from "react-icons/bs";

import { collection, addDoc } from "firebase/firestore";
import { useFirestore } from "reactfire";

import { UserContext } from "../../contexts";
import { notification } from "antd";

import { v4 as uuidv4 } from "uuid";

const AddContent = () => {
  const router = useRouter();
  const [userState] = useContext(UserContext);
  const { isLogged, displayName, photoURL } = userState;

  const firestore = useFirestore();
  const cardsCollection = collection(firestore, "cards");

  const [currentPage, setCurrentPage] = useState(1);
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

  useEffect(() => {
    if (!isLogged) {
      router.replace("/platform");
      console.info("User without permissions to create contents");
    }
  }, [isLogged]);

  const searchImage = () => {
    setImageList([]);
    unsplashService
      .searchByWord(getValues("search"), currentPage)
      .then(({ response }) => {
        setImageList(response.results);
      });
  };

  const handleClickImage = ({ URL, id }) => {
    setValue("newContent.image", URL);
    setSelectedPicture(id);
  };

  const loadMorePictures = () => {
    const picturesPerPage = 12;
    setCurrentPage(currentPage + 1);
    unsplashService
      .searchByWord(getValues("search"), currentPage + 1, picturesPerPage)
      .then(({ response }) => {
        setImageList([...imageList, ...response.results]);
      });
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
    addDoc(cardsCollection, {
      id: uuidv4(),
      owner: displayName,
      avatar: photoURL,
      ...getValues("newContent"),
    })
      .then(({ id }) => {
        console.log("New document added written with ID: ", id);
        notification.success({
          message: "Card added",
          placement: "bottomLeft",
          description:
            "The new word was added to our database, ¡take a look to the library of cards to show it!",
        });
        router.replace("/platform");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <div className="AddContentContainer" hidden={!userState.isLogged}>
      <Head>
        <title>Linguage | Add content</title>
      </Head>
      <Header />
      <Link href="/platform" passHref={true}>
        <GoBack previousPageName="Platform" />
      </Link>
      <h1>Create new content</h1>
      <form onSubmit={handleSubmit(saveNewContent)}>
        <div className="addContentForm">
          <div className="sideLeft">
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
            <div>
              <button type="submit" className="rectangleButton">
                Save new word
              </button>
            </div>
          </div>
          <div className="sideRight">
            <div className="inputSection">
              <span className="labelSearch">Search a picture</span>
              <div className="searchContainer">
                <Input
                  name="search"
                  style={{ width: "-webkit-fill-available" }}
                  placeholder="e.g. dog in the garden"
                  register={register}
                  errors={errors}
                  className="border-two-side"
                />
                <div className="searchButton" onClick={searchImage}>
                  <BiSearchAlt className="searchIcon" />
                </div>
              </div>
            </div>
            <div
              className="imagesGeneralContainer"
              hidden={
                !(
                  imageList &&
                  Array.isArray(imageList) &&
                  imageList.length >= 1
                )
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
                      loading="eager"
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
              {imageList && Array.isArray(imageList) && (
                <div className="loadMorePictures" onClick={loadMorePictures}>
                  <BiCloudDownload className="iconLoad" />
                  <span>Load more images</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddContent;
