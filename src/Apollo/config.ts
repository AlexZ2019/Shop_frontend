import {ApolloClient, InMemoryCache, createHttpLink} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {getStoreData} from "../helpers/localStorage";

const httpLink = createHttpLink({
    uri: "http://localhost:3001/graphql"
});

const authLink = setContext((_, { headers }) => {
    const token = getStoreData("accessToken");
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});
