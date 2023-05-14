import algoliasearch from 'algoliasearch';

const client = algoliasearch('F1CAUEOQIZ', 'eaa2e6835f850c03a318cb147805c1bc')
const index = client.initIndex('DEV');

export { client, index };
