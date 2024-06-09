import React from 'react';
import type { ReactNode } from 'react';

import { Button } from '@lawallet/ui';

import { TabStyle } from './style';

interface TabProps {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  isBlock?: boolean;
  // Valor opcional
  onClick?: () => void;
}

export function Tab(props: TabProps) {
  const { children, active = false, disabled = false, onClick, isBlock = false } = props;

  return (
    <TabStyle $active={active} $flex={isBlock ? 1 : 0}>
      <Button disabled={disabled} size="small" variant="borderless" onClick={onClick}>
        {children}
      </Button>
    </TabStyle>
  );
}
