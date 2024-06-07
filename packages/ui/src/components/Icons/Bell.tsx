import React from 'react';

import { IconsProps } from './types';

export function BellIcon({ color = 'currentColor' }: IconsProps) {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color}>
        <path d="M10.1 5.374a2.001 2.001 0 013.8 0A5.002 5.002 0 0117 10v4l2.146 2.146a.5.5 0 01-.353.854H5.207a.5.5 0 01-.353-.854L7 14v-4a5.002 5.002 0 013.1-4.626zM10 18a2 2 0 104 0h-4z"></path>
      </svg>
    </>
  );
}
