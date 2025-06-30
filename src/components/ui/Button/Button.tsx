import { type ButtonUIProps } from './type';
import styles from './Button.module.css';

export const ButtonUI = ({
  type,
  isActive = false,
  children,
  onClick,
  disabled = false,
}: ButtonUIProps) => (
  <button
    className={`
        ${styles.button}
        ${
          isActive
            ? styles['button_no-active']
            : type == 'send'
              ? styles.button_send
              : type == 'download'
                ? styles.button_download
                : type == 'clear'
                  ? styles.button_clear
                  : ''
        }
      `}
    onClick={onClick}
    disabled={disabled || isActive}
  >
    <div className={styles.button__wrapper}>{children}</div>
  </button>
);
