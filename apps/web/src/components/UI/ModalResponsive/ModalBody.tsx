'use client';

import { useState, useEffect, ReactNode } from 'react';
import { CrossIcon } from '@bitcoin-design/bitcoin-icons-react/filled';

import { ModalBodyStyle } from './style';
import { Container, Flex } from '@lawallet/ui';

interface ComponentProps {
  children: ReactNode;
}

export function ModalBody(props: ComponentProps) {
  const { children } = props;

  return <ModalBodyStyle>{children}</ModalBodyStyle>;
}
