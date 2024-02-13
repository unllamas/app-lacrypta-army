import React, { useState, useEffect, useRef } from 'react';

import { Input } from '../Input';
import { Item } from './Item';

import { AutocompleteProps } from './types';

import { AutocompletePrimitive, AutocompleteContent } from './style';

export function Autocomplete(props: AutocompleteProps) {
  const { data, value, onSelect } = props;
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (value) setOpen(!!value);
  }, [value]);

  useEffect(() => {
    if (value && !open) setOpen(false);
  }, [open]);

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      /**
       * Hide autocomplete if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const handleSelect = (value: string) => {
    setOpen(false);
    onSelect(value);
  };

  useOutsideAlerter(wrapperRef);

  return (
    <AutocompletePrimitive $isOpen={!!open} ref={wrapperRef}>
      <Input {...props} />
      {open && (
        <AutocompleteContent>
          {!value && data?.length && <span>Cargando...</span>}
          {value &&
            data?.slice(0, 3).map((lud16: string) => (
              <button onClick={() => handleSelect(lud16)}>
                <Item lud16={lud16} />
              </button>
            ))}
        </AutocompleteContent>
      )}
    </AutocompletePrimitive>
  );
}
