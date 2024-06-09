/* eslint-disable @next/next/no-img-element */
'use client';

// Libraries
import { useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'styled-components';
import {
  formatToPreference,
  normalizeLNDomain,
  useConfig,
  useNostrContext,
  useSubscription,
  useWalletContext,
} from '@lawallet/react';
import {
  AvatarImage,
  BannerAlert,
  BtnLoader,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HeroCard,
  Icon,
  ReceiveIcon,
  Text,
  ReportIcon,
  HearthIcon,
  Textarea,
  ActionSheet,
} from '@lawallet/ui';
import {
  GearIcon,
  HiddenIcon,
  QrCodeIcon,
  SatoshiV2Icon,
  SendIcon,
  VisibleIcon,
} from '@bitcoin-design/bitcoin-icons-react/filled';

// Theme
import { appTheme } from '@/config/exports';

// Hooks and utils
import { extractFirstTwoChars } from '@/utils';
import { copy } from '@/utils/share';
import { Link, useRouter } from '@/navigation';

// Components
import Animations from '@/components/Animations';
import BitcoinTrade from '@/components/Animations/bitcoin-trade.json';
import ButtonCTA from '@/components/ButtonCTA';
import Navbar from '@/components/Layout/Navbar';
import Subnavbar from '@/components/Layout/Subnavbar';
import { TokenList } from '@/components/TokenList';
import TransactionItem from '@/components/TransactionItem';
import Logo from '@/components/Logo';
import { PostImage } from '@/components/PostImage';
import { BoltIcon, CloseIcon, EllipsisIcon, ImageIcon } from '@/components/Icons';
import { Avatar } from '@/components/Avatar';
import {
  ModalResponsive,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@/components/UI';

// Constans
import { CACHE_BACKUP_KEY, EMERGENCY_LOCK_DEPOSIT, EMERGENCY_LOCK_TRANSFER } from '@/constants/constants';
import { PreviewImage } from '@/components/PreviewImage';
import { useDisclosure } from '@/hooks/useDisclosure';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import FormatPost from './components/FormatPost';

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
    account: { identity, balance, transactions },
    settings: {
      loading,
      toggleHideBalance,
      props: { hideBalance, currency },
    },
    converter: { pricesData, convertCurrency },
  } = useWalletContext();

  const convertedBalance: string = useMemo(() => {
    const amount: number = convertCurrency(balance.amount, 'SAT', currency);
    return formatToPreference(currency, amount, lng);
  }, [balance, pricesData, currency]);

  useEffect(() => {
    const userMadeBackup: boolean = Boolean(
      config.storage.getItem(`${CACHE_BACKUP_KEY}_${identity.data.hexpub}`) || false,
    );

    setShowBanner(!userMadeBackup ? 'backup' : 'none');
  }, []);

  const hasHandle = true;

  const publications = [
    {
      name: 'La Crypta',
      lud16: 'animales@lacrypta.army',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitamet, consectetur adipiscing.',
    },
    {
      name: 'La Crypta',
      lud16: 'animales@lacrypta.army',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitamet, consectetur adipiscing.',
    },
    {
      name: 'La Crypta',
      lud16: 'animales@lacrypta.army',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitamet, consectetur adipiscing.',
    },
    {
      name: 'La Crypta',
      lud16: 'animales@lacrypta.army',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitamet, consectetur adipiscing.',
    },
    {
      name: 'Jona |🇦🇷',
      lud16: 'dios@lacrypta.army',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitamet, consectetur adipiscing.',
      meta: {
        image_url: 'https://i.pinimg.com/564x/e7/d6/f8/e7d6f899f1a845493132824cd4176072.jpg',
      },
    },
    {
      name: 'Gorila 🧙🏼‍♂️',
      lud16: 'gorila@lacrypta.army',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitamet, consectetur adipiscing.',
      meta: {
        image_url: 'https://i.pinimg.com/564x/ce/8c/e3/ce8ce3b0811e083f13926da7c3a51578.jpg',
      },
    },
  ];

  const [tab, setTab] = useState('for-you');

  // Test Nostr
  const { signerInfo } = useNostrContext({ config });
  const pubkey = signerInfo?.pubkey || '';

  const [nostrEvents, setNostrEvents] = useState<NDKEvent[]>([]);

  // const handleGetProfile = (pubKey) => {
  //   const { events } = useSubscription({
  //     filters: [{ kinds: [0], authors: [pubKey] }],
  //     options: { closeOnEose: false },
  //     enabled: false,
  //   });

  //   return events;
  // };

  // const handleGetPost = (pubKey) => {
  //   const { events } = useSubscription({
  //     filters: [{ kinds: [1], authors: ['cee287bb0990a8ecbd1dee7ee7f938200908a5c8aa804b3bdeaed88effb55547'] }],
  //     options: { closeOnEose: false },
  //     enabled: true,
  //   });

  //   return events;
  // };

  const pubKey = 'cee287bb0990a8ecbd1dee7ee7f938200908a5c8aa804b3bdeaed88effb55547';

  const { events } = useSubscription({
    filters: [{ kinds: [0, 1], authors: [pubKey] }],
    options: { closeOnEose: false },
    enabled: true,
  });

  const loadNostrEvents = () => {
    const deduplicated = Object.values(Object.fromEntries(events.map((event) => [event.id, event as NDKEvent])));

    setNostrEvents(deduplicated.sort((a, b) => b.created_at! - a.created_at!));
  };

  const getProfile = (pubKey) => {
    const data = events?.find((event) => event.kind === 0 && event.pubkey === pubKey);
    // const parse = JSON.parse(data?.content || '');

    // return {
    //   name: parse?.displayName || parse?.display_name || '',
    //   email: parse?.lud16 || '',
    //   avatar: parse?.picture || '',
    // };

    return {
      name: 'Jona',
      email: '',
      avatar: '',
    };
  };

  const getReply = (note) => {};

  useEffect(() => {
    if (events.length) {
      loadNostrEvents();
      // getProfile(pubKey);
    }
  }, [events]);

  // const findPubkeyInTags = (tags, pubkey) => {
  //   return tags.some((tag) => tag[0] === 'p' && tag[1] === pubkey);
  // };

  return (
    <>
      {/* <Navbar>
        <Flex align="center" justify="center" gap={8}>
          <Logo size="sm" />
        </Flex>
      </Navbar> */}

      <Tabs>
        <TabList>
          <Tab active={tab === 'for-you'} isBlock onClick={() => setTab('for-you')}>
            Para ti
          </Tab>
          {/* <Tab active={tab === 'following'} isBlock onClick={() => setTab('following')}>
            Siguiendo
          </Tab> */}
        </TabList>
        <TabPanels>
          <TabPanel show={tab === 'for-you'}>
            <Flex direction="column" align="center">
              {nostrEvents.map((event, index) => {
                if (!event || event.kind !== 1) return null;
                // const hasReply = event?.tags?.length === 0 ? false : findPubkeyInTags(event?.tags, pubkey);
                return (
                  <div key={index} style={{ width: '100%', borderBottom: '1px solid #333' }}>
                    <Container>
                      <Divider y={16} />
                      <Flex gap={8}>
                        <Avatar size={10} alt={getProfile(event.pubkey).name} src={getProfile(event.pubkey).avatar} />
                        <Flex direction="column" gap={8}>
                          {/* Info user */}
                          <Flex justify="space-between" align="center">
                            <Flex direction="column">
                              <Flex align="center" gap={4}>
                                <Text isBold>{getProfile(event.pubkey).name}</Text>
                              </Flex>
                              <Text size="small" color={theme.colors.gray50}>
                                {getProfile(event.pubkey).email}
                              </Text>
                            </Flex>
                            <Flex gap={8} align="center" justify="end">
                              <Text size="small" color={theme.colors.gray50}>
                                Hace 10m
                              </Text>
                              {/* <Button size="small" variant="borderless">
                              <Icon>
                                <EllipsisIcon color={theme.colors.text} />
                              </Icon>
                            </Button> */}
                            </Flex>
                          </Flex>
                          <Flex direction="column" gap={8}>
                            <FormatPost content={event.content} />
                            {/* {post?.meta?.image_url && <PostImage src={post.meta.image_url} />} */}
                            <Flex gap={4} justify="space-between">
                              {/* TO-DO */}
                              {/* <Button size="small" variant={index % 2 ? 'bezeledGray' : 'borderless'}>
                              <Icon size="small">
                                <HearthIcon color={index % 2 ? theme.colors.primary : theme.colors.text} />
                              </Icon>
                            </Button> */}
                              {/* <Flex align="center" gap={4}>
                                <Button size="small" variant={index % 2 ? 'bezeled' : 'bezeledGray'}>
                                  <Icon size="small">
                                    <BoltIcon color={index % 2 ? theme.colors.primary : theme.colors.text} />
                                  </Icon>
                                </Button>
                                <Text size="small" color={appTheme.colors.gray50}>
                                  250 SATs
                                </Text>
                              </Flex> */}
                            </Flex>
                          </Flex>
                        </Flex>
                      </Flex>
                      <Divider y={16} />
                    </Container>
                  </div>
                );
              })}
            </Flex>
          </TabPanel>
          <TabPanel show={tab === 'following'}>
            <Container>siguiendo...</Container>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* <ActionSheet title="algo" description="hola?" cancelText="cerrar" isOpen={false} onClose={() => null}>
        <Button variant="bezeledGray">Copiar link del post</Button>
        <Button variant="bezeledGray">Silenciar</Button>
        <Button variant="bezeledGray">Denunciar publicacion</Button>
      </ActionSheet> */}

      {/* <Subnavbar path="home" onClick={onToggle} /> */}
    </>
  );
}
