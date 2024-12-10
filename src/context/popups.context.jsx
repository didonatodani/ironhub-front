import React, { useState } from "react";

const PopupContext = React.createContext();

function PopupProviderWrapper(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

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
      }}
    >
      {props.children}
    </PopupContext.Provider>
  );
}

export { PopupProviderWrapper, PopupContext };
