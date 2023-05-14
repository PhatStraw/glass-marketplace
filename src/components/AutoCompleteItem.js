import React from 'react';
import { NextRouter } from 'next/router';
import Link from 'next/link';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import { cx } from '../utils/cx';
import { Box } from '@mui/material';

export function AutocompleteItem({
  children,
  router,
  icon: Icon,
  actions,
  ...props
}) {
  return (
    <RouterContext.Provider value={router}>
      <Link href={props.href || '#'}>
        <Box
          {...props}
          style={{display: 'flex', flexDirection: 'row'}}
          className={cx(
            'flex items-stretch justify-between hover:bg-gray-100 aria-selected:bg-gray-100 transition-colors',
            props.className
          )}
        >
          <Box style={{display: 'flex', flexDirection: 'row'}}>
            <Box className="text-gray-400">
              <Icon style={{width: "20px", height: "20px"}} />
            </Box>
            <Box>{children}</Box>
          </Box>
          <div style={{display: 'flex', flexDirection: 'row'}}>{actions}</div>
        </Box>
      </Link>
    </RouterContext.Provider>
  );
}

export function AutocompleteItemAction({
  children,
  icon: Icon,
  ...props
}) {
  return (
    <button
      className="flex-none text-gray-400/80 transition-colors hover:text-gray-600/80 p-1.5 flex items-center justify-center"
      {...props}
    >
    <Icon style={{width: "20px", height: "20px"}} />
    </button>
  );
}