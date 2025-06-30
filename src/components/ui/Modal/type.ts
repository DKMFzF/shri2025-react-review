import type { ReactNode } from 'react';

export type ModalUIProps = {
  onClose: () => void;
  children?: ReactNode;
  modalRoot: HTMLElement;
};
