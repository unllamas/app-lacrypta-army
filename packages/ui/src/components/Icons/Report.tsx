import React from 'react';

import { IconsProps } from './types';

export function ReportIcon({ color = 'currentColor' }: IconsProps) {
  return (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15.1988 6.52795C13.2849 6.52795 11.7043 5.2857 9.29814 5.2857C8.40689 5.2857 7.60854 5.44227 6.86796 5.71474C6.9706 5.44669 7.01428 5.15968 6.99604 4.87324C6.93275 3.85767 6.10021 3.04306 5.0835 3.0017C3.94089 2.9552 3 3.8677 3 4.99999C3 5.67949 3.33918 6.27945 3.85714 6.64088V20.4286C3.85714 20.902 4.24089 21.2857 4.71429 21.2857H5.28571C5.75911 21.2857 6.14286 20.902 6.14286 20.4286V17.0571C7.15396 16.6263 8.41364 16.2671 10.2298 16.2671C12.1437 16.2671 13.7243 17.5093 16.1304 17.5093C17.8508 17.5093 19.2257 16.9274 20.5056 16.0501C20.8157 15.8376 21 15.4847 21 15.1087V6.42659C21 5.59113 20.1333 5.03838 19.3755 5.39031C18.1492 5.95988 16.645 6.52795 15.1988 6.52795Z"
          fill={color}
        />
      </svg>
    </>
  );
}
