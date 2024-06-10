'use client';

// Libraries
import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  detectTransferType,
  formatLNURLData,
  normalizeLNDomain,
  removeDuplicateArray,
  useConfig,
  useWalletContext,
} from '@lawallet/react';
import { Transaction, TransactionDirection, TransferTypes } from '@lawallet/react/types';
import {
  Autocomplete,
  Button,
  Container,
  Divider,
  Feedback,
  Flex,
  Icon,
  InputGroup,
  InputGroupRight,
  LinkButton,
  Text,
} from '@lawallet/ui';
import { CaretRightIcon } from '@bitcoin-design/bitcoin-icons-react/filled';

// Theme
import { appTheme } from '@/config/exports';

// Hooks and utils
import { useActionOnKeypress } from '@/hooks/useActionOnKeypress';
import useErrors from '@/hooks/useErrors';
import { lightningAddresses } from '@/constants/constants';

// Components
import Navbar from '@/components/Layout/Navbar';
import RecipientElement from './components/RecipientElement';

// Constans
import { EMERGENCY_LOCK_TRANSFER } from '@/constants/constants';

export default function Page() {
  const router = useRouter();
  const {
    account: { transactions, balance },
  } = useWalletContext();

  if (EMERGENCY_LOCK_TRANSFER || balance.amount === 0) {
    router.push('/dashboard');
    return null;
  }

  const t = useTranslations();

  const params = useSearchParams();

  const [inputText, setInputText] = useState<string>(params.get('data') ?? '');
  const [loading, setLoading] = useState<boolean>(false);

  const errors = useErrors();
  const config = useConfig();

  const initializeTransfer = async (data: string) => {
    if (loading) return;
    setLoading(true);

    const cleanData: string = data.trim();
    const type: TransferTypes = detectTransferType(cleanData);

    switch (type) {
      case TransferTypes.NONE:
        errors.modifyError('INVALID_RECIPIENT');
        setLoading(false);
        return;

      case TransferTypes.INVOICE:
        router.push(`/transfer/invoice/${cleanData}`);
        return;
    }

    const formattedLNURLData = await formatLNURLData(cleanData);
    if (formattedLNURLData.type === TransferTypes.NONE || formattedLNURLData.type === TransferTypes.INVOICE) {
      errors.modifyError('INVALID_RECIPIENT');
      setLoading(false);
      return;
    }

    router.push(`/transfer/lnurl?data=${cleanData}`);
    return;
  };

  const handleContinue = async () => {
    if (!inputText.length) return errors.modifyError('EMPTY_RECIPIENT');
    initializeTransfer(inputText);
  };

  useActionOnKeypress('Enter', handleContinue, [inputText]);

  const handlePasteInput = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
    } catch (error) {
      console.log('error', error);
    }
  };

  const lastDestinations = useMemo(() => {
    const receiversList: string[] = [];
    transactions.forEach((tx: Transaction) => {
      if (
        tx.direction === TransactionDirection.OUTGOING &&
        tx.metadata &&
        tx.metadata.receiver &&
        tx.metadata.receiver.includes('@') &&
        tx.metadata.receiver.length < 40 &&
        !receiversList.includes(tx.metadata.receiver)
      )
        receiversList.push(tx.metadata.receiver);
    });

    return receiversList;
  }, [transactions]);

  const autoCompleteData: string[] = useMemo(() => {
    if (!inputText.length || inputText.length > 15) return [];

    const data: string[] = lastDestinations.filter((dest) => dest.startsWith(inputText));
    if (data.length >= 3) return data;

    if (!inputText.includes('@'))
      return removeDuplicateArray([`${inputText}@${normalizeLNDomain(config.endpoints.lightningDomain)}`, ...data]);

    const [username, domain] = inputText.split('@');
    if (!domain) data.push(`${username}@${normalizeLNDomain(config.endpoints.lightningDomain)}`);

    const recommendations: string[] = [];
    lightningAddresses.forEach((address) => {
      if (address.startsWith(domain)) recommendations.push(`${username}@${address}`);
    });

    return removeDuplicateArray([...data, ...recommendations]);
  }, [lastDestinations, inputText]);

  return (
    <>
      {/* <Navbar showBackPage={true} title={t('TRANSFER_MONEY')} overrideBack="/dashboard" /> */}
      <Divider y={12} />
      <Container size="small">
        <Flex flex={1} direction="column">
          <InputGroup>
            <Autocomplete
              data={autoCompleteData}
              onSelect={setInputText}
              onChange={(e) => {
                errors.resetError();
                setInputText(e.target.value);
              }}
              placeholder={t('TRANSFER_DATA_PLACEHOLDER')}
              type="text"
              value={inputText}
              status={errors.errorInfo.visible ? 'error' : undefined}
              disabled={loading}
              visible={Boolean(autoCompleteData.length) && !loading}
            />
            <InputGroupRight>
              <Button size="small" variant="borderless" onClick={handlePasteInput} disabled={!!inputText}>
                {t('PASTE')}
              </Button>
            </InputGroupRight>
          </InputGroup>

          <Feedback show={errors.errorInfo.visible} status={'error'}>
            {errors.errorInfo.text}
          </Feedback>

          <Divider y={16} />
          <Flex>
            <LinkButton color="secondary" variant="bezeled" onClick={() => router.push('/scan')}>
              {t('SCAN_QR_CODE')}
            </LinkButton>
          </Flex>
          <Divider y={16} />
          {/* Ultimos 3 destinos */}
          {Boolean(lastDestinations.length) && (
            <>
              <Text size="small" color={appTheme.colors.gray50}>
                {t('LAST_RECIPIENTS')}
              </Text>

              <Divider y={12} />

              {lastDestinations.slice(0, 5).map((lud16) => {
                return (
                  <Flex key={lud16} onClick={() => initializeTransfer(lud16)} direction="column">
                    <Divider y={8} />
                    <Flex align="center">
                      <RecipientElement lud16={lud16} />
                      <Icon>
                        <CaretRightIcon />
                      </Icon>
                    </Flex>
                    <Divider y={8} />
                  </Flex>
                );
              })}
            </>
          )}
        </Flex>
      </Container>

      <Flex>
        <Container size="small">
          <Flex gap={8}>
            <Button color="secondary" variant="bezeledGray" onClick={() => router.push('/dashboard')}>
              {t('CANCEL')}
            </Button>

            <Button
              variant="bezeled"
              onClick={handleContinue}
              disabled={loading || inputText.length === 0}
              loading={loading}
            >
              {t('CONTINUE')}
            </Button>
          </Flex>
        </Container>
      </Flex>
    </>
  );
}
