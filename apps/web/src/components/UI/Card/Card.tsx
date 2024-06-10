import type { ReactNode } from 'react';

import { CardStyle } from './style';

interface CardProps {
  children: ReactNode;
  spacing?: number;
  variant?: 'unstyled' | 'filled' | 'outline';
}

export function Card(props: CardProps) {
  const { children, spacing = 0, variant = 'unstyled' } = props;

  return (
    <CardStyle $spacing={spacing} $variant={variant} className="card">
      {children}
    </CardStyle>
  );
}
