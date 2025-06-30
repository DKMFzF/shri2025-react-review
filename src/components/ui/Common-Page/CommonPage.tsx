import { type CommonPageUIProps } from './type';
import styles from './CommonPage.module.css';

export const CommonPageUI = ({ children }: CommonPageUIProps) => {
  return (
    <div className={styles['common-page']}>
      <div className={styles['common-page__content-wrapper']}>{children}</div>
    </div>
  );
};
