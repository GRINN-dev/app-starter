import { ApolloProvider } from "@apollo/client";
import { FC } from "react";
import { apolloClient } from "./apolloClient";

// apollo provider wrapper
export const ApolloProviderWrapper: FC<{
  endpoint: string;
  children: React.ReactNode;
}> = ({ endpoint, children }) => {
  return (
    <ApolloProvider client={apolloClient(endpoint)}>{children}</ApolloProvider>
  );
};
