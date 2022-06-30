import { ApolloProvider } from "@apollo/client";
import { setRevalidateHeaders } from "next/dist/server/send-payload";
import { createContext, FC, useEffect, useState } from "react";
import { apolloClient } from "./apolloClient";
import CustomApolloProvider from "./CustomApolloProvider";

export const TokenContext = createContext("");
// apollo provider wrapper
export const ApolloProviderWrapper: FC<{
  endpoint: string;
  setAccessToken: (token: string) => void;
  getAccessToken: () => string;
  children: React.ReactNode;
}> = ({ endpoint, setAccessToken, getAccessToken, children }) => {
  console.log("my tok : ", getAccessToken());
  const [myAccessToken, setMyAccessToken] = useState(getAccessToken());

  return (
    <TokenContext.Provider value={getAccessToken()}>
      <CustomApolloProvider
        setAccessToken={setAccessToken}
        getAccessToken={getAccessToken}
        endpoint={endpoint}
        children={children}
      ></CustomApolloProvider>
    </TokenContext.Provider>
  );
};
