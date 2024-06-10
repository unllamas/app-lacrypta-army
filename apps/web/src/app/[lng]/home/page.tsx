/* eslint-disable @next/next/no-img-element */
'use client';

// Libraries
import { useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'styled-components';
import { formatToPreference, useConfig, useNostrContext, useSubscription, useWalletContext } from '@lawallet/react';
import { Container, Flex } from '@lawallet/ui';

import { useRouter } from '@/navigation';

// Components
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@/components/UI';

// Constans
import { CACHE_BACKUP_KEY } from '@/constants/constants';
import { useDisclosure } from '@/hooks/useDisclosure';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import Post from './components/Post';

export default function Page() {
  const config = useConfig();
  const t = useTranslations();
  const lng = useLocale();
  const theme = useTheme();

  // Custom hooks
  const { onToggle, onClose, isOpen } = useDisclosure();

  const [showBanner, setShowBanner] = useState<'backup' | 'none'>('none');

  const router = useRouter();
  const {
    account: { identity, balance },
    settings: {
      props: { currency },
    },
    converter: { pricesData, convertCurrency },
  } = useWalletContext();

  useEffect(() => {
    const userMadeBackup: boolean = Boolean(
      config.storage.getItem(`${CACHE_BACKUP_KEY}_${identity.data.hexpub}`) || false,
    );

    setShowBanner(!userMadeBackup ? 'backup' : 'none');
  }, []);

  const [tab, setTab] = useState('for-you');

  // Test Nostr
  const { signerInfo } = useNostrContext({ config });
  const pubkey = signerInfo?.pubkey || '';

  const [nostrEvents, setNostrEvents] = useState<NDKEvent[]>([]);

  const pubKey = 'cee287bb0990a8ecbd1dee7ee7f938200908a5c8aa804b3bdeaed88effb55547';

  const { events } = useSubscription({
    filters: [
      { kinds: [1], authors: [pubKey] },
      { kinds: [1], '#p': [pubkey] },
    ],
    options: { closeOnEose: false },
    enabled: true,
  });

  const loadNostrEvents = () => {
    const deduplicated = Object.values(Object.fromEntries(events.map((event) => [event.id, event as NDKEvent])));

    setNostrEvents(deduplicated.sort((a, b) => b.created_at! - a.created_at!));
  };

  useEffect(() => {
    if (events.length) {
      loadNostrEvents();
    }
  }, [events]);

  return (
    <>
      <Tabs>
        <TabList>
          <Tab active={tab === 'for-you'} isBlock onClick={() => setTab('for-you')}>
            Para ti
          </Tab>
          <Tab active={tab === 'following'} isBlock onClick={() => setTab('following')}>
            Siguiendo
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel show={tab === 'for-you'}>
            <Flex direction="column" align="center">
              {nostrEvents?.map((event, index) => {
                if (!event || event.kind !== 1) return null;
                return <Post key={index} data={event} />;
              })}
            </Flex>
          </TabPanel>
          <TabPanel show={tab === 'following'}>
            <Container>siguiendo...</Container>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
