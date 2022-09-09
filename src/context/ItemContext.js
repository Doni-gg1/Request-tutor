import { createContext } from "react";

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const test = "Hello, world!";
  const mood = [1, 2, 3, 4]
  
  return (
    <ItemContext.Provider
      value={{
        test,
        mood
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
