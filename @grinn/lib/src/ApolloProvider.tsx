import { createContext, FC, SetStateAction, useEffect, useState } from "react";
import CustomApolloProvider from "./CustomApolloProvider";
import { Dispatch } from "react";

export const TokenContext = createContext<{
  accessToken: string;
  setAccessToken: Dispatch<SetStateAction<string>>;
}>({
  accessToken: "",
  setAccessToken: () => {},
});
// apollo provider wrapper
export const ApolloProviderWrapper: FC<{
  endpoint: string;
  children: React.ReactNode;
}> = ({ endpoint, children }) => {
  return (
    <CustomApolloProvider endpoint={endpoint}>{children}</CustomApolloProvider>
  );
};
