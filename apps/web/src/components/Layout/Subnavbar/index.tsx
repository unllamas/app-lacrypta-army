'use client';

// Libraries
import { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useWalletContext } from '@lawallet/react';
import { Button, Container, Icon, Text, Flex, GearIcon, WalletIcon, BellIcon, Textarea, Divider } from '@lawallet/ui';
import { HomeIcon } from '@bitcoin-design/bitcoin-icons-react/filled';

// Hooks
import { useDisclosure } from '@/hooks/useDisclosure';

// Components
import ButtonCTA from '@/components/ButtonCTA';
import { PlusIcon } from '@/components/Icons';
import { ModalResponsive, ModalHeader, ModalBody, ModalFooter } from '@/components/UI';

// Styles
import { SubnavbarPrimitive } from './style';
import useQuery from '@/hooks/useQuery';
import { useTheme } from 'styled-components';
import Logo from '@/components/Logo';

interface ComponentProps {
  children?: ReactNode;
  title?: string;
  showBackPage?: boolean;
  overrideBack?: string;
  path: string;
}

export default function Subnavbar(props: ComponentProps) {
  const { path } = props;

  // Custom hooks
  const { onToggle, onClose, isOpen } = useDisclosure();
  const { device } = useQuery();

  const router = useRouter();
  // const t = useTranslations();
  const theme = useTheme();

  return (
    <Flex flex={1} direction="column">
      <Divider y={12} />
      <SubnavbarPrimitive $background={device === 'desktop' ? 'transparent' : theme.colors.gray15}>
        <Container size="small">
          <Flex
            direction={device === 'desktop' ? 'column' : 'row'}
            gap={16}
            align={device === 'desktop' ? 'start' : 'end'}
            flex={0}
          >
            <Button
              size={device === 'desktop' ? 'normal' : 'small'}
              variant={path === '/home/' ? 'bezeledGray' : 'borderless'}
              color={path === '/home/' ? 'primary' : 'secondary'}
              onClick={() => router.push('/home')}
            >
              <Icon>
                <HomeIcon />
              </Icon>
              {device === 'desktop' && 'Inicio'}
            </Button>

            <Button
              size={device === 'desktop' ? 'normal' : 'small'}
              variant={path === '/plugins/' ? 'bezeledGray' : 'borderless'}
              color={path === '/plugins/' ? 'primary' : 'secondary'}
              disabled={true}
              onClick={() => null}
            >
              <Icon>
                <BellIcon />
              </Icon>
              {device === 'desktop' && 'Notificaciones'}
            </Button>

            {device !== 'desktop' && (
              <ButtonCTA>
                <Button onClick={onToggle} variant="bezeledGray">
                  <PlusIcon />
                </Button>
              </ButtonCTA>
            )}

            <Button
              size={device === 'desktop' ? 'normal' : 'small'}
              variant={path === '/dashboard/' ? 'bezeledGray' : 'borderless'}
              color={path === '/dashboard/' ? 'primary' : 'secondary'}
              onClick={() => router.push('/dashboard')}
            >
              <Icon>
                <WalletIcon />
              </Icon>
              {device === 'desktop' && 'Billetera'}
            </Button>

            <Button
              size={device === 'desktop' ? 'normal' : 'small'}
              variant={path === '/settings/' ? 'bezeledGray' : 'borderless'}
              color={path === '/settings/' ? 'primary' : 'secondary'}
              onClick={() => router.push('/settings')}
            >
              <Icon>
                <GearIcon />
              </Icon>
              {device === 'desktop' && 'Ajustes'}
            </Button>

            {device === 'desktop' && (
              <Button onClick={onToggle}>
                <Icon>
                  <PlusIcon />
                </Icon>
                Publicar
              </Button>
            )}
          </Flex>
        </Container>
      </SubnavbarPrimitive>

      <ModalResponsive isOpen={isOpen} onClose={onClose}>
        <ModalHeader>
          <Text isBold>Nueva publicacion</Text>
        </ModalHeader>
        <ModalBody>
          <Flex gap={8}>
            {/* <Avatar>
              <Text size="small">{'DI'}</Text>
            </Avatar> */}
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
    </Flex>
  );
}
