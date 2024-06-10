'use client';

import { appTheme } from '@/config/exports';
import { styled } from 'styled-components';

interface ModalProps {
  $isOpen?: boolean;
}

export const Modal = styled.div<ModalProps>`
  position: fixed;
  width: 100dvw;
  height: 100dvh;
  top: 0;
  left: 0;
  z-index: 11;

  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  justify-content: center;
  width: 100%;
  height: 100%;

  @media screen and (min-width: 1023px) {
    > div {
      height: fit-content;
    }
  }

  @media screen and (min-width: 1023px) {
    padding: 32px 0;
  }

  &:before {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    width: 100%;
    height: 100%;

    background-color: rgba(28, 28, 28, 0.95);
    backdrop-filter: blur(16px);
  }
`;

export const ModalContent = styled.div`
  position: relative;
  overflow: hidden;
  z-index: 2;

  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 420px;

  background-color: ${(props) => props.theme.colors.background};

  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.48);

  @media screen and (min-width: 1023px) {
    border: 1px solid ${(props) => props.theme.colors.gray20};
    border-radius: 24px;
  }
`;

export const ModalHeaderStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;

  padding: 0 16px;

  border-bottom: 1px solid ${(props) => props.theme.colors.gray20};
`;

export const ModalBodyStyle = styled.div`
  width: 100%;
  flex: 1;
  align-items: center;

  padding: 0 16px;
`;

export const ModalFooterStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  padding: 16px;
  padding-bottom: 32px;

  background-color: ${(props) => props.theme.colors.gray15};
  border-top: 1px solid ${(props) => props.theme.colors.gray20};

  @media screen and (min-width: 1023px) {
    padding: 16px;
  }
`;
