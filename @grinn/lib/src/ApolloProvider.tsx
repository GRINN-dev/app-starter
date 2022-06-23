import { ApolloProvider } from "@apollo/client";
import { setRevalidateHeaders } from "next/dist/server/send-payload";
import { FC } from "react";
import { apolloClient } from "./apolloClient";

// apollo provider wrapper
export const ApolloProviderWrapper: FC<{
  endpoint: string;
  setAccessToken: (token: string) => void;
  getAccessToken: () => string;
  children: React.ReactNode;
}> = ({ endpoint, setAccessToken, getAccessToken, children }) => {
  return (
    <ApolloProvider
      client={apolloClient({ endpoint, setAccessToken, getAccessToken })}
    >
      {children}
    </ApolloProvider>
  );
};
