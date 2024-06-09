'use client';
import { useRouter } from '@/navigation';

import Navbar from '@/components/Layout/Navbar';
import { CACHE_BACKUP_KEY } from '@/constants/constants';
import { useActionOnKeypress } from '@/hooks/useActionOnKeypress';
import useErrors from '@/hooks/useErrors';
import { useConfig, useWalletContext } from '@lawallet/react';
import { getUsername } from '@lawallet/react/actions';
import { Button, Container, Divider, Feedback, Flex, Heading, Input } from '@lawallet/ui';
import { useTranslations } from 'next-intl';
import { getPublicKey } from 'nostr-tools';
import { ChangeEvent, useState } from 'react';

export default function Page() {
  const {
    account: { identity },
  } = useWalletContext();

  const [keyInput, setKeyInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const t = useTranslations();
  const config = useConfig();
  const router = useRouter();
  const errors = useErrors();

  const handleChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    errors.resetError();
    setKeyInput(e.target.value);
  };

  const handleRecoveryAccount = async () => {
    if (keyInput.length < 32) {
      errors.modifyError('KEY_LENGTH_ERROR');
      return;
    }

    setLoading(true);

    try {
      const hexpub: string = getPublicKey(keyInput);
      const username: string = await getUsername(hexpub, config);

      if (!username.length) {
        errors.modifyError('NOT_FOUND_PUBKEY');
        setLoading(false);
        return;
      }

      identity.initializeCustomIdentity(keyInput, username).then((res) => {
        if (res) {
          config.storage.setItem(`${CACHE_BACKUP_KEY}_${hexpub}`, '1');
          router.push('/dashboard');
        }
      });
    } catch (err) {
      errors.modifyError('UNEXPECTED_RECEOVERY_ERROR');
    }

    setLoading(false);
  };

  useActionOnKeypress('Enter', handleRecoveryAccount, [keyInput]);

  return (
    <>
      {/* <Navbar /> */}
      <Divider y={60} />

      <Container size="small">
        <Flex direction="column" flex={1}>
          <Heading as="h2">{t('LOGIN_TITLE')}</Heading>

          <Divider y={8} />
          <Input type="password" placeholder={t('INSERT_PRIVATE_KEY')} onChange={handleChangeInput} />

          <Feedback show={errors.errorInfo.visible} status={'error'}>
            {errors.errorInfo.text}
          </Feedback>
        </Flex>
      </Container>

      {/* <Button onClick={authWithExtension}>login with extension</Button> */}

      <Flex>
        <Container size="small">
          <Divider y={16} />
          <Flex gap={8}>
            <Button variant="bezeledGray" onClick={() => router.push('/')}>
              {t('CANCEL')}
            </Button>
            <Button onClick={handleRecoveryAccount} disabled={!keyInput.length || loading} loading={loading}>
              {t('LOGIN')}
            </Button>
          </Flex>
          <Divider y={32} />
        </Container>
      </Flex>
    </>
  );
}
