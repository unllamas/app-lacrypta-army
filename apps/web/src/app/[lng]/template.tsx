'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { normalizeLNDomain, useConfig, useWalletContext } from '@lawallet/react';
import { Flex, Avatar, Button, Icon, HiddenIcon, VisibleIcon, Text } from '@lawallet/ui';

import { appTheme } from '@/config/exports';

import { extractFirstTwoChars } from '@/utils';
import { copy } from '@/utils/share';

import Navbar from '@/components/Layout/Navbar';
import Subnavbar from '@/components/Layout/Subnavbar';
import Logo from '@/components/Logo';

const principalPaths = ['/home/', '/dashboard/', '/settings/'];

export default function Template(props: any) {
  const { children } = props;

  const t = useTranslations();
  const config = useConfig();
  const pathname = usePathname();

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
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {identity?.data?.privateKey && (
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
                  <Text size="small">
                    {identity.data.username ? extractFirstTwoChars(identity.data.username) : 'AN'}
                  </Text>
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
      )}

      <div
        style={{
          overflowX: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '12px 0 16px 0',
          maxHeight: identity?.data?.privateKey ? 'calc(100dvh - 146px)' : 'inherit',
        }}
      >
        {children}
      </div>

      {identity?.data?.privateKey && <Subnavbar path={pathname} />}
    </div>
  );
}
