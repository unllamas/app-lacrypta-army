import { ReactNode } from 'react';
import { PreviewImageStyle } from './style';

interface PreviewImageProps {
  children: ReactNode;
}

export const PreviewImage = (props: PreviewImageProps) => {
  const { children } = props;

  return <PreviewImageStyle>{children}</PreviewImageStyle>;
};
