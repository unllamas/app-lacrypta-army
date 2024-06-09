'use client';

// Libraries
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { formatAddress, lnurl_encode, normalizeLNDomain, useConfig, useWalletContext } from '@lawallet/react';
import { Button, Container, Divider, Flex, Text } from '@lawallet/ui';

// Theme
import { appTheme } from '@/config/exports';

// Hooks and utils
import { useNotifications } from '@/context/NotificationsContext';
import { useRouter } from '@/navigation';
import { copy } from '@/utils/share';

// Components
import { QRCode } from '@/components/UI';
import Navbar from '@/components/Layout/Navbar';
import InvoiceSheet from './components/InvoiceSheet';

// Constans
import { EMERGENCY_LOCK_DEPOSIT } from '@/constants/constants';

export default function Page() {
  const router = useRouter();

  if (EMERGENCY_LOCK_DEPOSIT) {
    router.push('/dashboard');
    return null;
  }

  const config = useConfig();
  const t = useTranslations();
  const notifications = useNotifications();
  const {
    account: { identity },
  } = useWalletContext();

  const [isOpenSheet, setIsOpenSheet] = useState<boolean>(false);

  const handleCopy = (text: string) => {
    copy(text).then((res) => {
      notifications.showAlert({
        description: res ? t('SUCCESS_COPY') : t('ERROR_COPY'),
        type: res ? 'success' : 'error',
      });
    });
  };

  const LNURLEncoded: string = useMemo(
    () =>
      lnurl_encode(
        `${config.endpoints.lightningDomain}/.well-known/lnurlp/${
          identity.data.username ? identity.data.username : identity.data.npub
        }`,
      ).toUpperCase(),
    [identity],
  );

  return (
    <>
      {/* <Navbar showBackPage={true} title={t('DEPOSIT')} /> */}

      {identity.data.username.length ? (
        <>
          <Flex flex={1} justify="center" align="center">
            <QRCode
              size={300}
              borderSize={30}
              value={('lightning:' + LNURLEncoded).toUpperCase()}
              textToCopy={`${identity.data.username}@${normalizeLNDomain(config.endpoints.lightningDomain)}`}
            />
          </Flex>
          <Flex>
            <Container size="small">
              <Divider y={16} />

              <Flex align="center">
                <Flex direction="column">
                  <Text size="small" color={appTheme.colors.gray50}>
                    {t('USER')}
                  </Text>
                  <Flex>
                    <Text>
                      {identity.data.username
                        ? `${identity.data.username}@${normalizeLNDomain(config.endpoints.lightningDomain)}`
                        : formatAddress(LNURLEncoded, 20)}
                    </Text>
                  </Flex>
                </Flex>
                <div>
                  <Button
                    size="small"
                    variant="bezeled"
                    color="secondary"
                    onClick={() =>
                      handleCopy(
                        identity.data.username
                          ? `${identity.data.username}@${normalizeLNDomain(config.endpoints.lightningDomain)}`
                          : LNURLEncoded,
                      )
                    }
                  >
                    {t('COPY')}
                  </Button>
                </div>
              </Flex>

              <Divider y={16} />
            </Container>
          </Flex>

          <Flex>
            <Container size="small">
              <Divider y={16} />
              <Flex gap={8}>
                <Button
                  variant="bezeled"
                  onClick={() => {
                    setIsOpenSheet(true);
                  }}
                >
                  {t('CREATE_INVOICE')}
                </Button>
              </Flex>
            </Container>
          </Flex>
        </>
      ) : null}

      <InvoiceSheet isOpen={isOpenSheet} onClose={() => setIsOpenSheet(false)} handleCopy={handleCopy} />
    </>
  );
}
