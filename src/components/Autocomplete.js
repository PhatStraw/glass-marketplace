// import React from "react";
// import {
//   createElement,
//   Fragment,
//   useEffect,
//   useRef,
//   useState,
//   useMemo
// } from "react";
// import { render } from "react-dom";

// import { usePagination, useSearchBox } from "react-instantsearch-hooks";
// import { autocomplete, AutocompleteOptions } from "@algolia/autocomplete-js";
// import { BaseItem } from "@algolia/autocomplete-core";
// import { createLocalStorageRecentSearchesPlugin } from "@algolia/autocomplete-plugin-recent-searches";
// import { createQuerySuggestionsPlugin } from "@algolia/autocomplete-plugin-query-suggestions";
// import algoliasearch from 'algoliasearch/lite';

// const searchClient = algoliasearch('Y22DSFGSTV', 'd13ec2902d97cbfbf1df02e11df0ea5d')

// export function Autocomplete({
//   className,
//   ...autocompleteProps
// }) {
//   const autocompleteContainer = useRef(null);

//   const { query, refine: setQuery } = useSearchBox();
//   const { refine: setPage } = usePagination();

//   const [instantSearchUiState, setInstantSearchUiState] = useState({ query });

//   const plugins = useMemo(() => {
//     const recentSearches = createLocalStorageRecentSearchesPlugin({
//       key: "instantsearch",
//       limit: 3,
//       transformSource({ source }) {
//         return {
//           ...source,
//           onSelect({ item }) {
//             setInstantSearchUiState({ query: item.label });
//           }
//         };
//       }
//     });
//     const querySuggestions = createQuerySuggestionsPlugin({
//         searchClient,
//         indexName: "dev_headies_query_suggestions",
//         getSearchParams() {
//           return recentSearches.data.getAlgoliaSearchParams({
//             hitsPerPage: 6
//           });
//         },
//         transformSource({ source }) {
//           return {
//             ...source,
//             sourceId: "querySuggestionsPlugin",
//             onSelect({ item }) {
//               setInstantSearchUiState({ query: item.query });
//             },
//             getItems(params) {
//               if (!params.state.query) {
//                 return [];
//               }
  
//               return source.getItems(params);
//             },
//           };
//         }
//       });

//       return [recentSearches, querySuggestions];
//     }, []);

//   useEffect(() => {
//     setQuery(instantSearchUiState.query);
//     setPage(0);
//   }, [instantSearchUiState]);

//   useEffect(() => {
//     if (!autocompleteContainer.current) {
//       return;
//     }

//     const autocompleteInstance = autocomplete({
//       ...autocompleteProps,
//       container: autocompleteContainer.current,
//       initialState: { query },
//       onReset() {
//         setInstantSearchUiState({ query: "" });
//       },
//       onSubmit({ state }) {
//         setInstantSearchUiState({ query: state.query });
//       },
//       onStateChange({ prevState, state }) {
//         console.log(state.query)
//         if (prevState.query !== state.query) {
//           setInstantSearchUiState({
//             query: state.query
//           });
//         }
//       },
//       renderer: { createElement, Fragment, render },
//       plugins,
//     }, [plugins]);

//     return () => autocompleteInstance.destroy();
//   }, []);

//   return <div className={className} ref={autocompleteContainer} />;
// }

import { autocomplete } from '@algolia/autocomplete-js';
import React, { createElement, Fragment, useEffect, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';

export function Autocomplete(
  options
) {
  const { className, ...props } = options;
  const containerRef = useRef(null);
  const panelRootRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment, render: () => {} },
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(children);
      },
      ...props,
    });

    return () => {
      search.destroy();
    };
  }, [props]);

  return <div ref={containerRef} className={className} />;
}