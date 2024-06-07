'use client';

import { useState, useEffect, ReactNode } from 'react';
import { CrossIcon } from '@bitcoin-design/bitcoin-icons-react/filled';

import { ModalFooterStyle } from './style';
import { Container, Flex } from '@lawallet/ui';

interface ComponentProps {
  children: ReactNode;
}

export function ModalFooter(props: ComponentProps) {
  const { children } = props;

  return <ModalFooterStyle>{children}</ModalFooterStyle>;
}
