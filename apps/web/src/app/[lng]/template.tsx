'use client';

import { usePathname } from 'next/navigation';
import { useTheme } from 'styled-components';
import { useTranslations } from 'next-intl';
import { normalizeLNDomain, useConfig, useWalletContext } from '@lawallet/react';
import {
  Flex,
  Avatar,
  Button,
  Icon,
  HiddenIcon,
  VisibleIcon,
  Text,
  Container,
  Input,
  Divider,
  Heading,
} from '@lawallet/ui';

import { appTheme } from '@/config/exports';

import { extractFirstTwoChars } from '@/utils';
import { copy } from '@/utils/share';

import Viewport from '@/components/Layout/Viewport';
import Navbar from '@/components/Layout/Navbar';
import Content from '@/components/Layout/Content';
import Subnavbar from '@/components/Layout/Subnavbar';
import Logo from '@/components/Logo';
import { Card } from '@/components/UI';
import useQuery from '@/hooks/useQuery';

const principalPaths = ['/home/', '/dashboard/', '/settings/'];

export default function Template(props: any) {
  const { children } = props;

  const t = useTranslations();
  const config = useConfig();
  const pathname = usePathname();
  const theme = useTheme();
  const { device } = useQuery();

  const {
    account: { identity, balance },
    settings: {
      loading,
      toggleHideBalance,
      props: { hideBalance },
    },
  } = useWalletContext();

  const isPrincipalPath = !!principalPaths.find((item) => item === pathname);

  return (
    <Viewport>
      {/* {identity?.data?.privateKey && ( */}
      <Navbar showBackPage={!isPrincipalPath} title={!isPrincipalPath ? pathname : null}>
        {pathname === '/home/' && (
          <Flex align="center" justify="center" gap={8}>
            <Logo size="sm" />
          </Flex>
        )}
        {pathname === '/dashboard/' && (
          <>
            <Flex align="center" gap={8}>
              <Avatar>
                <Text size="small">{identity.data.username ? extractFirstTwoChars(identity.data.username) : 'AN'}</Text>
              </Avatar>
              <Flex direction="column">
                <Text size="small" color={appTheme.colors.gray50}>
                  {t('HELLO')},
                </Text>
                <Flex
                  onClick={() => {
                    if (identity.data.username)
                      copy(`${identity.data.username}@${normalizeLNDomain(config.endpoints.lightningDomain)}`);
                  }}
                >
                  {loading ? (
                    <Text> -- </Text>
                  ) : (
                    <Text>
                      {identity.data.username
                        ? `${identity.data.username}@${normalizeLNDomain(config.endpoints.lightningDomain)}`
                        : t('ANONYMOUS')}
                    </Text>
                  )}
                </Flex>
              </Flex>
            </Flex>
            <Flex gap={4} justify="end">
              {Number(balance.amount) > 0 && (
                <Button
                  variant="bezeled"
                  color={hideBalance ? 'secondary' : 'primary'}
                  size="small"
                  onClick={toggleHideBalance}
                >
                  <Icon size="small">{hideBalance ? <HiddenIcon /> : <VisibleIcon />}</Icon>
                </Button>
              )}
            </Flex>
          </>
        )}
        {pathname === '/settings/' && (
          <Flex align="center" justify="center" gap={8}>
            <Text isBold>Ajustes</Text>
          </Flex>
        )}
      </Navbar>
      {/* )} */}

      <Content>{children}</Content>

      {identity?.data?.privateKey && <Subnavbar path={pathname} />}

      {identity?.data?.privateKey && (
        <aside>
          <Container size="small">
            <Divider y={12} />
            <Input placeholder="Buscar" />
            <Divider y={16} />
            <Card spacing={4} variant="outline">
              <Heading as="h4">Suscribite a Premium</Heading>
              <Divider y={16} />
              <Text>
                Accede a contenido exclusivo, actualizaciones y apoya a tus creadores favoritos con donaciones.
              </Text>
              <Divider y={8} />
              <Flex flex={1}>
                <Button size="small">Registrarme</Button>
              </Flex>
            </Card>
            <Divider y={16} />
            <Card spacing={4} variant="outline">
              <Heading as="h4">A quién seguir</Heading>
              <Divider y={16} />
              <Flex justify="space-between" gap={16}>
                <Flex gap={8} align="center">
                  <Avatar>DI</Avatar>
                  <Flex direction="column">
                    <Text>Jona</Text>
                    <Text color={theme.colors.gray50}>dios@lawallet.ar</Text>
                  </Flex>
                </Flex>
                <Button size="small" variant="borderless">
                  Seguir
                </Button>
              </Flex>
              <Divider y={16} />
              <Flex justify="space-between" gap={16}>
                <Flex gap={8} align="center">
                  <Avatar>DI</Avatar>
                  <Flex direction="column">
                    <Text>Jona</Text>
                    <Text color={theme.colors.gray50}>dios@lawallet.ar</Text>
                  </Flex>
                </Flex>
                <Button size="small" variant="borderless">
                  Seguir
                </Button>
              </Flex>
            </Card>
          </Container>
        </aside>
      )}
    </Viewport>
  );
}
