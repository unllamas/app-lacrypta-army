'use client';

import { useTranslations } from 'next-intl';
import { Flex, Heading, Text } from '@lawallet/ui';

import { appTheme } from '@/config/exports';
import { HomeDescription } from './style';

export default function Component() {
  const t = useTranslations();

  return (
    <HomeDescription>
      <Flex direction="column" align="center" gap={8}>
        <Text align="center">Creá contenido y recibí Satoshis como recomensa en menos de... </Text>
        <Heading align="center" color={appTheme.colors.primary}>
          {t('CONFIGURE_CARD_SECONDS')}
        </Heading>
      </Flex>
    </HomeDescription>
  );
}
