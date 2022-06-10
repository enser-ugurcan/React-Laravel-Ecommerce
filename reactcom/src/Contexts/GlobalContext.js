import React, { useContext, useState } from "react";

const GlobalContext = React.createContext();

export function GlobalProvider({ children }) {
  const [language, setLanguage] = useState("eng");

  const changeLanguage = (langSlug) => {
    setLanguage(langSlug);
  };

  const value = {
    changeLanguage,
    language,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default GlobalContext;
