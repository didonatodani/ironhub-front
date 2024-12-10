import React, { useState } from "react";

const PopupContext = React.createContext();

function PopupProviderWrapper(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteOn, setDeleteOn] = useState(false);
  const [deletePost, setDeletePost] = useState(false);
  const [deleteReply, setDeleteReply] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageMessage, setImageMessage] = useState("");

  return (
    <PopupContext.Provider
      value={{
        errorMessage,
        setErrorMessage,
        showErrorPopup,
        setShowErrorPopup,
        confirmationMessage,
        setConfirmationMessage,
        showConfirmation,
        setShowConfirmation,
        deleteOn,
        setDeleteOn,
        deletePost,
        setDeletePost,
        deleteReply,
        setDeleteReply,
        imageError,
        setImageError,
        imageMessage,
        setImageMessage,
      }}
    >
      {props.children}
    </PopupContext.Provider>
  );
}

export { PopupProviderWrapper, PopupContext };
