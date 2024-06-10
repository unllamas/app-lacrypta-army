'use client';

// Libraries
import { useTranslations } from 'next-intl';
import { Divider } from '@lawallet/ui';
import { TransferTypes } from '@lawallet/react/types';

// Hooks
import { useLNURLContext } from '@/context/LNURLContext';
import { useActionOnKeypress } from '@/hooks/useActionOnKeypress';

// Components
import Navbar from '@/components/Layout/Navbar';
import { ErrorTransfer } from '../../components/Error';
import { FinishTransfer } from '../../components/Finish';
import { Summary } from '../../components/Summary';

const page = () => {
  const t = useTranslations();
  const { LNURLTransferInfo, isSuccess, isPending, isError, execute, isLoading } = useLNURLContext();

  useActionOnKeypress('Enter', execute, [LNURLTransferInfo]);

  return (
    <>
      <Divider y={12} />
      {isSuccess || isError ? (
        <>
          {/* <Navbar /> */}

          {isError ? <ErrorTransfer /> : <FinishTransfer transferInfo={LNURLTransferInfo} />}
        </>
      ) : (
        <>
          {/* <Navbar
            showBackPage={true}
            title={t('VALIDATE_INFO')}
            overrideBack={
              LNURLTransferInfo.type === TransferTypes.LNURLW
                ? `/transfer`
                : `/transfer/lnurl?data=${LNURLTransferInfo.data}&amount=${LNURLTransferInfo.amount}${LNURLTransferInfo.comment ? `&comment=${LNURLTransferInfo.comment}` : ''}`
            }
          /> */}
          <Summary
            isLoading={isLoading}
            isSuccess={isSuccess}
            isPending={isPending}
            data={LNURLTransferInfo.data}
            type={LNURLTransferInfo.type}
            amount={LNURLTransferInfo.amount}
            expired={false}
            onClick={execute}
          />
        </>
      )}
    </>
  );
};

export default page;
