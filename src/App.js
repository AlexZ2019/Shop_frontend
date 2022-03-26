import './App.css';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    uri: process.env.REACT_APP_API_PATH,
    cache: new InMemoryCache()
});

function App() {
  return (
      <ApolloProvider client={client} >
          <div className="App">
          </div>
      </ApolloProvider>
  );
}

export default App;
