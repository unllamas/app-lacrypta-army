'use client';

import { useState, useEffect, ReactNode } from 'react';
import { CrossIcon } from '@bitcoin-design/bitcoin-icons-react/filled';

import { ModalHeaderStyle } from './style';
import { Container, Flex } from '@lawallet/ui';

interface ComponentProps {
  children: ReactNode;
}

export function ModalHeader(props: ComponentProps) {
  const { children } = props;

  return <ModalHeaderStyle>{children}</ModalHeaderStyle>;
}
