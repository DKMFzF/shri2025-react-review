import { type CommonSectionUIProps } from './type';
import styles from './CommonSection.module.css';

export const CommonSectionUI = ({ children }: CommonSectionUIProps) => (
  <section className={styles['common-section']}>
    <div className={styles['common-section__wrapper-section']}>{children}</div>
  </section>
);
