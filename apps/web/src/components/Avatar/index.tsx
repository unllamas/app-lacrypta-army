import React from 'react';
import { useTheme } from 'styled-components';

import { Text, Icon, CheckIcon } from '@lawallet/ui';

import { AvatarPrimitive, AvatarBadgeStyle } from './style';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: number;
  checked?: boolean;
}

export function Avatar({ src = '', alt, size = 8, checked = false }: AvatarProps) {
  const theme = useTheme();

  const extractFirstTwoChars = (str: string): string => {
    try {
      return str.substring(0, 2).toUpperCase();
    } catch {
      return '--';
    }
  };

  return (
    <AvatarPrimitive $size={size} $background={theme.colors.gray20} $borderColor={theme.colors.gray25}>
      {src ? <img src={src} alt={alt} loading="lazy" /> : <Text size="small">{extractFirstTwoChars(alt)}</Text>}
      {src && checked && (
        <AvatarBadgeStyle $isSmall={size <= 12}>
          <Icon>
            <CheckIcon color={theme.colors.success} />
          </Icon>
        </AvatarBadgeStyle>
      )}
    </AvatarPrimitive>
  );
}
