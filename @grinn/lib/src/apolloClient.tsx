import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");

  // return the headers to the context so httpLink can read them
  const headerWithAuth = {
    ...headers,
    authorization: token ? `Bearer ${token}` : "",
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

export const apolloClient = (endpoint: string) => {
  return new ApolloClient({
    link: authLink.concat(httpLink(endpoint)),
    cache: new InMemoryCache(),
  });
};
