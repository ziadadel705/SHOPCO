import { createContext, useState } from "react";

export let tokenContext = createContext();

export default function tokenContextProvider(props) {
  const [token, setToken] = useState(null);
  return (
    <tokenContext.Provider value={{ token, setToken }}>
      {props.children}
    </tokenContext.Provider>
  );
}
