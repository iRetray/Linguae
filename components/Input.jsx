import React from "react";
import translateService from "../services/translateService";
import Error from "./Error";

const Input = (props) => {
  const { id, placeholder, isTextArea, newContent, register, errors } = props;
  const onHandleChangeEnglish = ({ target }) => {
    if (target.value !== "") {
      translateService.translate(target.value).then(({ translatedText }) => {
        props.handleChangeOnBlur(translatedText);
      });
    } else {
      props.handleChangeOnBlur("");
    }
  };

  return (
    <div className="containerInput">
      {isTextArea ? (
        <textarea
          {...register(newContent ? `newContent.${id}` : id, {
            required: true,
          })}
          autoComplete="off"
          onBlurCapture={
            props.handleChangeOnBlur !== undefined
              ? onHandleChangeEnglish
              : () => {}
          }
          placeholder={placeholder ? placeholder : ""}
        />
      ) : (
        <input
          {...props}
          {...register(newContent ? `newContent.${id}` : id, {
            required: true,
          })}
          autoComplete="off"
          placeholder={placeholder ? placeholder : ""}
        />
      )}
      {newContent
        ? errors &&
          errors["newContent"] &&
          errors["newContent"][id]?.type === "required" && (
            <Error nameInput="value in English" />
          )
        : errors &&
          errors[id] &&
          errors[id]?.type === "required" && (
            <Error nameInput="value in English" />
          )}
    </div>
  );
};

export default Input;
