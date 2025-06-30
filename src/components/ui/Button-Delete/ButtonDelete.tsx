import { type ButtonDeleteUIProps } from './type.ts';
import styles from './ButtonDelete.module.css';

export const ButtonDeleteUI = ({
  version = 'default',
  onDelete,
}: ButtonDeleteUIProps) => (
  <button
    className={`
    ${styles['button-delete']}
    ${
      version == 'default'
        ? styles['button-delete_default']
        : styles['button-delete_trash']
    }
  `}
    onClick={onDelete}
  ></button>
);
