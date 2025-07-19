// src/apollo.js
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import { setContext } from "@apollo/client/link/context";

// 1) RestLink to hit your existing /api endpoints
const restLink = new RestLink({
  uri: process.env.REACT_APP_API_URL, // e.g. "https://your-vercel.app/api/"
});

// 2) authLink to read the token and add it to headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("auth_token");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// 3) Create ApolloClient
export const apolloClient = new ApolloClient({
  link: authLink.concat(restLink),
  cache: new InMemoryCache(),
});
