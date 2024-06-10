'use client';

// Libraries
import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Divider } from '@lawallet/ui';
import { TransferTypes } from '@lawallet/react/types';

// Hooks
import { useLNURLContext } from '@/context/LNURLContext';
import { useRouter } from '@/navigation';

// Components
import { SelectTransferAmount } from '../components/SelectAmount';

const TransferWithLNURL = () => {
  const t = useTranslations();
  const { LNURLTransferInfo, setAmountToPay, setComment } = useLNURLContext();
  const router = useRouter();

  useEffect(() => {
    if (LNURLTransferInfo.type === TransferTypes.LNURLW && LNURLTransferInfo.data && LNURLTransferInfo.amount)
      router.push(`/transfer/lnurl/summary?data=${LNURLTransferInfo.data}&amount=${LNURLTransferInfo.amount}`);
  }, [LNURLTransferInfo.amount]);

  return (
    <>
      {/* <Navbar showBackPage={true} title={t('DEFINE_AMOUNT')} overrideBack={`/transfer`} /> */}
      <Divider y={12} />
      <SelectTransferAmount transferInfo={LNURLTransferInfo} setAmountToPay={setAmountToPay} setComment={setComment} />
    </>
  );
};

export default TransferWithLNURL;
