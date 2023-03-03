import gql from "graphql-tag";

export const ITEM_QUERY = gql`
    query GetItem($id: Float!) {
        getItem(id: $id) {
            id
            image
            title
            description
        }
    }
`
