'use client';

// Libraries
import { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useWalletContext } from '@lawallet/react';
import {
  Button,
  Container,
  Icon,
  QrCodeIcon,
  Text,
  Flex,
  Avatar,
  GearIcon,
  WalletIcon,
  BellIcon,
  Textarea,
} from '@lawallet/ui';
import { HomeIcon, RocketIcon } from '@bitcoin-design/bitcoin-icons-react/filled';

// Hooks
import { useDisclosure } from '@/hooks/useDisclosure';

// Components
import ButtonCTA from '@/components/ButtonCTA';
import { CloseIcon, ImageIcon, PlusIcon } from '@/components/Icons';
import { PostImage } from '@/components/PostImage';
import { PreviewImage } from '@/components/PreviewImage';
import { ModalResponsive, ModalHeader, ModalBody, ModalFooter } from '@/components/UI';

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
  const { path, onClick } = props;

  console.log('path', path);

  // Custom hooks
  const { onToggle, onClose, isOpen } = useDisclosure();

  const {
    account: { balance },
  } = useWalletContext();

  const router = useRouter();
  const t = useTranslations();

  return (
    <>
      <SubnavbarPrimitive>
        <Container size="small">
          <Flex gap={16} justify="center" align="end" flex={0}>
            <Button
              size="small"
              variant="borderless"
              color={path === '/home/' ? 'primary' : 'secondary'}
              onClick={() => router.push('/home')}
            >
              <Icon>
                <HomeIcon />
              </Icon>
            </Button>

            <Button
              size="small"
              variant="borderless"
              color={path === '/plugins/' ? 'primary' : 'secondary'}
              disabled={true}
              // onClick={() => router.push('/dashboard')}
            >
              <Icon>
                <BellIcon />
              </Icon>
            </Button>

            {!EMERGENCY_LOCK_TRANSFER && (
              <ButtonCTA>
                <Button onClick={onToggle} variant="bezeledGray">
                  <PlusIcon />
                </Button>
              </ButtonCTA>
            )}

            <Button
              size="small"
              variant="borderless"
              color={path === '/dashboard/' ? 'primary' : 'secondary'}
              onClick={() => router.push('/dashboard')}
            >
              <Icon>
                <WalletIcon />
              </Icon>
            </Button>

            <Button
              size="small"
              variant="borderless"
              color={path === '/settings/' ? 'primary' : 'secondary'}
              onClick={() => router.push('/settings')}
            >
              <Icon>
                <GearIcon />
              </Icon>
            </Button>
          </Flex>
        </Container>
      </SubnavbarPrimitive>

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
              {/* <PreviewImage>
                <PostImage src="https://assets.lawallet.app/cover.png" />
                <Button size="small" variant="bezeledGray">
                  <Icon>
                    <CloseIcon />
                  </Icon>
                </Button>
              </PreviewImage> */}
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          {/* <div>
            <Button size="small" variant="bezeledGray">
              <Icon>
                <ImageIcon />
              </Icon>
            </Button>
          </div> */}
          <Flex gap={4} justify="end">
            <Button variant="bezeledGray" color="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="bezeled" onClick={() => null}>
              Publicar
            </Button>
          </Flex>
        </ModalFooter>
      </ModalResponsive>
    </>
  );
}
