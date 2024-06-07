'use client';

import { useState, useEffect, ReactNode } from 'react';
import { CrossIcon } from '@bitcoin-design/bitcoin-icons-react/filled';

import { Modal, ModalContent } from './style';

import { Flex, Button, Icon, Heading, Text, Container } from '@lawallet/ui';

import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';

import { ImageIcon } from '@/components/Icons';

interface ComponentProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function ModalResponsive(props: ComponentProps) {
  const { children, isOpen, onClose, title } = props;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Modal $isOpen={open}>
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
}
