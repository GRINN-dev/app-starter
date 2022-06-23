import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Children, useMemo } from "react";
import { apolloClient } from "./apolloClient";

interface CustomApolloProviderProps {
  endpoint: string;
  getAccessToken: () => string;
  children: React.ReactNode;
}

// The name here doesn't really matters.
export default function CustomApolloProvider(props: CustomApolloProviderProps) {
  // Whenever the token changes, the component re-renders, thus updating the ref.
  //tokenRef.current = token;

  // Ensure that the client is only created once.
  const client = useMemo(() => {
    const authLink = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token = props.getAccessToken();
      console.log("apollo props token : ", props.getAccessToken());
      // return the headers to the context so httpLink can read them
      const headerWithAuth = {
        ...headers,
        //authorization: token ? `Bearer ${token}` : "",
        authorization: "Bearer " + token,
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

    return new ApolloClient({
      link: authLink.concat(httpLink(props.endpoint)),
      cache: new InMemoryCache(),
    });
  }, []);

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
