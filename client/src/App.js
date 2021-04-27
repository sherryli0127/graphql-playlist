import ApolloClient from "apollo-boost";
// import { ApolloClient, InMemoryCache } from '@apollo/client';

import {ApolloProvider} from "react-apollo";
// import { ApolloProvider } from '@apollo/client';

//components
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

//apollo client setup
const client = new ApolloClient({
  //the endpoint making queries to
  // uri: "http://localhost:4000/graphql",
  uri: "https://graphql-readinglist.herokuapp.com/graphql",
  // cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Sherry's Reading List</h1>
        <BookList></BookList>
        <AddBook></AddBook>
      </div>
    </ApolloProvider>
  );
}

export default App;
