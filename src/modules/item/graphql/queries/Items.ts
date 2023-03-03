import gql from 'graphql-tag';

export const ITEMS_QUERY = gql`
    query GetItems($page: Float!) {
        getItems(page: $page) {
            items {
                id
                title
            }
            total
        }
    }
`;
