import algoliasearch from 'algoliasearch';

const client = algoliasearch("Y22DSFGSTV", process.env.NEXT_ALGOLIA_SEARCH_KEY);
const index = client.initIndex('headies');

export { client, index };
