import React from 'react';
import type { ReactNode } from 'react';
import { Container, Flex } from '@lawallet/ui';

import { TabListStyle } from './style';

interface TabListProps {
  children: ReactNode;
}

export function TabList(props: TabListProps) {
  const { children } = props;

  return (
    <TabListStyle>
      <Container>
        <Flex gap={8}>{children}</Flex>
      </Container>
    </TabListStyle>
  );
}
