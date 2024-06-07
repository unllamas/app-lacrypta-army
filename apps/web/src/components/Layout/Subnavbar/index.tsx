'use client';

// Libraries
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useWalletContext } from '@lawallet/react';
import { Button, Container, Icon, QrCodeIcon, Text, Flex, Avatar, GearIcon, WalletIcon, BellIcon } from '@lawallet/ui';
import { HomeIcon, RocketIcon } from '@bitcoin-design/bitcoin-icons-react/filled';

// Hooks
import { useDisclosure } from '@/hooks/useDisclosure';

// Components
import ButtonCTA from '@/components/ButtonCTA';
import { PlusIcon } from '@/components/Icons';
import { appTheme } from '@/config/exports';

// Constants
import { EMERGENCY_LOCK_TRANSFER } from '@/constants/constants';

// Styles
import { SubnavbarPrimitive } from './style';

interface ComponentProps {
  children?: ReactNode;
  title?: string;
  showBackPage?: boolean;
  overrideBack?: string;
  path: string;
  onClick?: any;
}

export default function Subnavbar(props: ComponentProps) {
  const { path = 'home', onClick } = props;

  // Custom hooks
  const { onToggle } = useDisclosure();

  const {
    account: { balance },
  } = useWalletContext();

  const router = useRouter();
  const t = useTranslations();

  return (
    <SubnavbarPrimitive>
      <Container size="small">
        <Flex gap={16} justify="center" align="end" flex={0}>
          <Button
            size="small"
            variant={path === 'home' ? 'bezeled' : 'bezeledGray'}
            onClick={() => router.push('/home')}
          >
            <Icon>
              <HomeIcon />
            </Icon>
          </Button>

          <Button
            size="small"
            variant={path === 'plugins' ? 'bezeled' : 'bezeledGray'}
            disabled={true}
            // onClick={() => router.push('/dashboard')}
          >
            <Icon>
              <BellIcon />
            </Icon>
          </Button>

          {!EMERGENCY_LOCK_TRANSFER && (
            <ButtonCTA>
              <Button onClick={onClick}>
                <PlusIcon />
              </Button>
            </ButtonCTA>
          )}

          <Button
            size="small"
            variant={path === 'dashboard' ? 'bezeled' : 'bezeledGray'}
            onClick={() => router.push('/dashboard')}
          >
            <Icon>
              <WalletIcon />
            </Icon>
          </Button>

          <Button
            size="small"
            variant={path === 'settings' ? 'bezeled' : 'bezeledGray'}
            onClick={() => router.push('/settings')}
          >
            <Icon>
              <GearIcon />
            </Icon>
          </Button>
        </Flex>
      </Container>
    </SubnavbarPrimitive>
  );
}
