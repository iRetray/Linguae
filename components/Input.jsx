import React from "react";

export const Input = ({
  name,
  isTextArea,
  placeholder,
  register,
  validationSchema,
  errors,
  handleBlur,
  className,
}) => {
  const getErrorByName = () => {
    return !name.includes(".")
      ? errors[name]?.message
      : errors[name.split(".")[0]]
      ? errors[name.split(".")[0]][name.split(".")[1]]?.message
      : null;
  };

  return (
    <div className="InputContainer">
      {isTextArea ? (
        <textarea
          autoComplete="off"
          spellCheck="false"
          rows={3}
          onBlurCapture={handleBlur}
          placeholder={placeholder}
          className={className}
          {...register(name, validationSchema)}
        />
      ) : (
        <input
          autoComplete="off"
          spellCheck="false"
          placeholder={placeholder}
          className={className}
          {...register(name, validationSchema)}
        />
      )}
      {getErrorByName() && (
        <span className="errorMessage">{getErrorByName()}</span>
      )}
    </div>
  );
};
