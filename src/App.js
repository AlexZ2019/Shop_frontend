import './App.css';
import {ApolloProvider} from "@apollo/client";
import {client} from "./Apollo/config";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
      <ApolloProvider client={client}>
          <BrowserRouter>
              <div className="App">
              </div>
          </BrowserRouter>
      </ApolloProvider>
  );
}

export default App;
