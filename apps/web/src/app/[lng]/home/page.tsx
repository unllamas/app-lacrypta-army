/* eslint-disable @next/next/no-img-element */
'use client';

// Libraries
import { useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'styled-components';
import { formatToPreference, normalizeLNDomain, useConfig, useWalletContext } from '@lawallet/react';
import {
  Avatar,
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
import { CloseIcon, EllipsisIcon, ImageIcon } from '@/components/Icons';
import { ModalResponsive, ModalHeader, ModalBody, ModalFooter } from '@/components/UI';

// Constans
import { CACHE_BACKUP_KEY, EMERGENCY_LOCK_DEPOSIT, EMERGENCY_LOCK_TRANSFER } from '@/constants/constants';
import { PreviewImage } from '@/components/PreviewImage';
import { useDisclosure } from '@/hooks/useDisclosure';

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

  return (
    <>
      <Navbar>
        <Flex align="center" justify="center" gap={8}>
          <Logo size="sm" />
        </Flex>
      </Navbar>

      <Container>
        {publications.map((post, index) => (
          <div key={index} style={{ borderBottom: '1px solid #333' }}>
            <Divider y={16} />
            <Flex gap={8}>
              <Avatar>
                <Text size="small">{'DI'}</Text>
              </Avatar>
              <Flex direction="column" gap={8}>
                {/* Info user */}
                <Flex justify="space-between" align="center">
                  <Flex direction="column">
                    <Flex align="center" gap={4}>
                      <Text isBold>{post.name}</Text>
                    </Flex>
                    <Text size="small" color={theme.colors.gray50}>
                      {post.lud16}
                    </Text>
                  </Flex>
                  <Flex gap={8} flex={0} align="center">
                    <Text size="small" color={theme.colors.gray50}>
                      10m
                    </Text>
                    {/* <Text size="small" color={theme.colors.gray50}>
                      •
                    </Text>
                    <Button size="small" variant="bezeledGray">
                      <Icon>
                        <EllipsisIcon />
                      </Icon>
                    </Button> */}
                  </Flex>
                </Flex>
                <Flex direction="column" gap={8}>
                  <Text>{post.description}</Text>
                  {post?.meta?.image_url && <PostImage src={post.meta.image_url} />}
                  <Flex gap={8} justify="space-between">
                    {/* TO-DO */}
                    <Button size="small" variant={index % 2 ? 'bezeledGray' : 'borderless'}>
                      <Icon size="small">
                        <HearthIcon color={index % 2 ? theme.colors.primary : theme.colors.text} />
                      </Icon>
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Divider y={16} />
          </div>
        ))}
      </Container>

      <Divider y={120} />

      <ModalResponsive isOpen={isOpen} onClose={onClose}>
        <ModalHeader>
          <Text isBold>Nueva publicacion</Text>
        </ModalHeader>
        <ModalBody>
          <Flex gap={8}>
            <Avatar>
              <Text size="small">{'DI'}</Text>
            </Avatar>
            <Flex direction="column" gap={8}>
              <Textarea placeholder="¿Qué estás pensando?" />
              <PreviewImage>
                <PostImage src="https://cdn.discordapp.com/attachments/1151562522265141329/1248064199872221296/image.png?ex=6662f69d&is=6661a51d&hm=02f28ea592c7cbbe75cfd2266bdb2f4081ff40b5fa0e18f595cc846d82873861&" />
                <Button size="small" variant="bezeledGray">
                  <Icon>
                    <CloseIcon />
                  </Icon>
                </Button>
              </PreviewImage>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <div>
            <Button size="small" variant="bezeledGray">
              <Icon>
                <ImageIcon />
              </Icon>
            </Button>
          </div>
          <Flex gap={4} justify="end">
            <Button size="small" variant="borderless" onClick={onClose}>
              Cancelar
            </Button>
            <Button size="small" disabled>
              Publicar
            </Button>
          </Flex>
        </ModalFooter>
      </ModalResponsive>

      <Subnavbar path="home" onClick={onToggle} />
    </>
  );
}
