import { ApolloProvider } from "@apollo/client";
import React, { useEffect, useState } from "react";
import client from "./apollo";
import "./App.css";
import { GraphQLQueryList } from "./GraphQL";
import { Poll } from "./Poll";
import { getUserId } from "./session";
import { Users } from "./Users";


const App = () => {
  const defaultState = { loading: true, userId: "" };
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await getUserId();
      setState({ loading: false, userId });
    };

    fetchUserId();
  }, []);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Users />
        <Poll userId={state.userId} />
      </div>
    </ApolloProvider>
  );
};

export default App;