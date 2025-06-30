import { type ButtonUploadUIProps } from './type';
import styles from './ButtonUpload.module.css';

export const ButtonUploadUI = ({ children, onClick }: ButtonUploadUIProps) => (
  <button className={styles['button-upload']} onClick={onClick}>
    {children}
  </button>
);
