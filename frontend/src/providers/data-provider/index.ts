"use client";

import graphqlDataProvider, { GraphQLClient } from "@refinedev/graphql";

const API_URL = "http://localhost:5000/graphql";

export const client = new GraphQLClient(API_URL);

export const dataProvider = graphqlDataProvider(client);
