import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useState } from "react";

let access_token: string = "";

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  console.log("apollo client");
  console.log(access_token);
  console.log("cont ");
  console.log(token);
  // return the headers to the context so httpLink can read them
  const headerWithAuth = {
    ...headers,
    //authorization: token ? `Bearer ${token}` : "",
    authorization: "Bearer " + access_token,
  };
  return {
    headers: token ? headerWithAuth : headers,
  };
});

const httpLink = (endpoint: string) => {
  return new HttpLink({
    uri: endpoint,
  });
};

interface AppoloClientProps {
  endpoint: string;
  setAccessToken: (token: string) => void;
  getAccessToken: () => string;
}

export const apolloClient = ({
  endpoint,
  setAccessToken,
  getAccessToken,
}: AppoloClientProps) => {
  console.log("get");
  console.log(getAccessToken());
  access_token = getAccessToken();

  const [token] = useState(getAccessToken());
  return new ApolloClient({
    link: authLink.concat(httpLink(endpoint)),
    cache: new InMemoryCache(),
  });
};
