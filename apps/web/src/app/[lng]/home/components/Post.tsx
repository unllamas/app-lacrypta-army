'use client';

import Link from 'next/link';
import { useTheme } from 'styled-components';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useFormatter, useSubscription } from '@lawallet/react';
import { Button, Container, Divider, Flex, HearthIcon, Icon, Text } from '@lawallet/ui';
import { EllipsisIcon } from '@bitcoin-design/bitcoin-icons-react/filled';

import { appTheme } from '@/config/exports';

import { Avatar } from '@/components/Avatar';
import FormatPost from './FormatPost';
import { BoltIcon } from '@/components/Icons';

export default function Post(props) {
  const { data } = props;

  if (!data) return null;

  const theme = useTheme();

  const pubKey = 'cee287bb0990a8ecbd1dee7ee7f938200908a5c8aa804b3bdeaed88effb55547';

  const isAnAnswer = () => {
    if (data.tags && data.tags.length) {
      return data.tags.some((tag) => tag[0] === 'p' && tag[1] === pubKey);
    } else {
      return false;
    }
  };

  function formatTimeAgo(created_at) {
    const currentDate: any = new Date();
    const createdAtDate: any = new Date(created_at * 1000); // Convertir a milisegundos

    const timeDifferenceInSeconds = Math.floor((currentDate - createdAtDate) / 1000);

    // Definir los intervalos de tiempo en segundos
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      min: 60,
    };

    // Calcular la diferencia en cada intervalo de tiempo
    let intervalType;
    let intervalValue;

    for (const [key, value] of Object.entries(intervals)) {
      intervalValue = Math.floor(timeDifferenceInSeconds / value);

      if (intervalValue > 1) {
        intervalType = key;
        break;
      } else if (intervalValue === 1) {
        intervalType = key;
        break;
      }
    }

    // Determinar el formato del mensaje
    switch (intervalType) {
      case 'min':
        return 'Hace un momento';
      case 'hour':
        return `Hace ${intervalValue} minutos`;
      case 'day':
        return `Hace ${intervalValue} horas`;
      case 'week':
      case 'month':
      case 'year':
        return `Hace ${intervalValue} ${intervalType}s`;
      default:
        // Si han pasado más de 7 días, mostrar la fecha de publicación
        const day = createdAtDate.getDate();
        const month = createdAtDate.getMonth() + 1;
        const year = createdAtDate.getFullYear();
        return `${day}/${month}/${year}`;
    }
  }

  return (
    <div onClick={() => alert('asd')} style={{ width: '100%', borderBottom: '1px solid #333', cursor: 'pointer' }}>
      <Container>
        <Divider y={16} />
        <Flex gap={8}>
          <Avatar size={10} alt={''} src={'/profile.png'} />
          <Flex direction="column" gap={8}>
            {/* Info user */}
            <Flex justify="space-between" align="center">
              <Flex direction="column">
                <Flex align="center" gap={4}>
                  <Text isBold color={theme.colors.text}>
                    {'Jona'}
                  </Text>
                </Flex>
                <Text size="small" color={theme.colors.gray50}>
                  {'dios@lawallet.ar'}
                </Text>
              </Flex>
              <Flex gap={8} align="center" justify="end">
                <Text size="small" color={theme.colors.gray50}>
                  {formatTimeAgo(data?.created_at)}
                </Text>
                <Button size="small" color="secondary" variant="bezeledGray">
                  <Icon>
                    <EllipsisIcon color={theme.colors.text} />
                  </Icon>
                </Button>
              </Flex>
            </Flex>
            <Flex direction="column" gap={8}>
              {isAnAnswer() && (
                <Flex gap={4} align="center">
                  <Text size="small" color={theme.colors.text}>
                    Reply to
                  </Text>
                  <Link href="#">
                    <Text size="small">@alguien</Text>
                  </Link>
                </Flex>
              )}
              <FormatPost content={data.content} />
              {/* {post?.meta?.image_url && <PostImage src={post.meta.image_url} />} */}
              <Flex gap={16}>
                {/* TO-DO */}
                <Flex align="center" gap={4} flex={0}>
                  {/* liked ? 'bezeledGray' : 'borderless' */}
                  <Button size="small" variant={'borderless'}>
                    <Icon size="small">
                      {/* liked ? theme.colors.primary : theme.colors.text */}
                      <HearthIcon color={theme.colors.text} />
                    </Icon>
                  </Button>
                </Flex>
                <Flex align="center" gap={4} flex={0}>
                  {/* zaped ? 'bezeledGray' : 'borderless' */}
                  <Button size="small" variant={'borderless'}>
                    <Icon size="small">
                      {/* liked ? theme.colors.primary : theme.colors.text */}
                      <BoltIcon color={theme.colors.text} />
                    </Icon>
                  </Button>
                  <Text size="small" color={appTheme.colors.gray50}>
                    250
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Divider y={16} />
      </Container>
    </div>
  );
}
