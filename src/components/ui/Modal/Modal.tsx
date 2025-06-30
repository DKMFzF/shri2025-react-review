import { createPortal } from 'react-dom';

import { ButtonDeleteUI } from '../';

import styles from './Modal.module.css';
import { type ModalUIProps } from './type';

export const ModalUI = ({ onClose, children, modalRoot }: ModalUIProps) =>
  createPortal(
    <div className={styles.modal__overlay} onClick={onClose}>
      <div>
        <div className={styles['modal__cloase-btn']}>
          <ButtonDeleteUI onDelete={onClose}></ButtonDeleteUI>
        </div>
        <div
          className={styles['modal__modal-content']}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>,
    modalRoot
  );
