import React from 'react';

export const Characters = React.lazy(() => import('./characters'));
export const Locations = React.lazy(() => import('./locations'));
export const Episodes = React.lazy(() => import('./episodes'));
export const Favourites = React.lazy(() => import('./favourites'));
