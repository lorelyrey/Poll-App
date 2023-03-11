import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const GRAPHQL_ENDPOINT = "rapid-man-22.hasura.app";

const scheme = (proto) =>
 window.location.protocol === "https:" ? `${proto}s` : proto;

 
const wsURI = `${scheme("ws")}://${GRAPHQL_ENDPOINT}/v1/graphql`;
 const httpURL = `${scheme("https")}://${GRAPHQL_ENDPOINT}/v1/graphql`;


const splitter = ({ query }) => {
  const { kind, operation } = getMainDefinition(query) || {};
  const isSubscription =
    kind === "OperationDefinition" && operation === "subscription";
  return isSubscription;
};

 

const cache = new InMemoryCache();
const options = { reconnect: true };

const wsLink = new GraphQLWsLink(createClient({ url: wsURI, connectionParams: { options } }));
const httpLink = new HttpLink({ uri: httpURL });
const link = split(splitter, wsLink, httpLink);
const client = new ApolloClient({ link, cache });

 

export default client;