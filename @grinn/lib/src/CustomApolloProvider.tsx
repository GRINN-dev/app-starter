import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  Observable,
} from "@apollo/client";
import { useContext } from "react";
import { TokenContext } from "./ApolloProvider";
import jwtDecode from "jwt-decode";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { onError } from "@apollo/client/link/error";

interface CustomApolloProviderProps {
  endpoint: string;
  children: React.ReactNode;
}

export type Token = {
  sub: string;
  iss?: string;
  exp?: string;
  aud?: string;
};

// The name here doesn't really matters.
export default function CustomApolloProvider(props: CustomApolloProviderProps) {
  const { accessToken, setAccessToken } = useContext(TokenContext);

  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle: any;
        Promise.resolve(operation)
          .then(operation => {
            if (accessToken) {
              operation.setContext({
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              });
            }
          })
          .then(() => {
            handle =
              forward &&
              forward(operation).subscribe({
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              });
          })
          .catch(observer.error.bind(observer));

        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );

  const tokenLink = new TokenRefreshLink({
    isTokenValidOrUndefined: () => {
      const token = accessToken;

      if (!token) {
        return true;
      }

      try {
        const { exp } = jwtDecode<Token>(token);
        if (exp && Date.now() >= parseInt(exp) * 1000) {
          return false;
        } else {
          return true;
        }
      } catch (err) {
        return false;
      }
    },
    fetchAccessToken: () =>
      fetch("http://localhost:8000/access_token", {
        method: "POST",
        credentials: "include",
      }),
    handleFetch: access_token => {
      setAccessToken(access_token);
    },
    handleError: err => {
      console.warn("Your refresh token is invalid. Please try re-logging in.");
      console.error(err);
    },
  });

  const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.error(
          "[GraphQL error]: Message:",
          err.message,
          "Location(s):",
          err.locations,
          "Path:",
          err.path
        );
      }
    }
    if (networkError) {
      console.warn(
        "[Network error]:",
        networkError,
        "Operation:",
        operation.operationName
      );
    }
  });

  const httpLink = new HttpLink({
    uri: props.endpoint,
    credentials: "include",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([tokenLink, errorLink, requestLink, httpLink]),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
