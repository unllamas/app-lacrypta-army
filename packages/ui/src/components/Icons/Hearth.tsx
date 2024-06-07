import React from 'react';

import { IconsProps } from './types';

export function HearthIcon({ color = 'currentColor' }: IconsProps) {
  return (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M19.2529 5.57693C17.3263 3.93516 14.4611 4.23047 12.6928 6.05504L12.0003 6.7687L11.3077 6.05504C9.54288 4.23047 6.67419 3.93516 4.74766 5.57693C2.53989 7.46127 2.42388 10.8432 4.39962 12.8858L11.2022 19.9099C11.6417 20.3634 12.3553 20.3634 12.7948 19.9099L19.5974 12.8858C21.5766 10.8432 21.4606 7.46127 19.2529 5.57693Z"
          fill={color}
        />
      </svg>
    </>
  );
}
