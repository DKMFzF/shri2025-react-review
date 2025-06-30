import { AppHeaderNavLinkUI } from '../';
import { type AppHedaerUIProps } from './type';
import styles from './AppHeader.module.css';

export const AppHeaderUI = ({ locationPath }: AppHedaerUIProps) => (
  <header className={styles.header}>
    <div className={styles.header__row}>
      <div className={styles['header__meta-info']}>
        <img
          className={styles.header__logo}
          src="./logo-icon.svg"
          alt="летних школ"
          loading="lazy"
          decoding="async"
        />
        <span
          className={`${styles.header__text} ${styles['header__short-description']}`}
        >
          Межгалактическая аналитика
        </span>
      </div>

      <nav className={styles['header__top-menu']}>
        <AppHeaderNavLinkUI
          url="/"
          pathImg="./analyst-icon.svg"
          altImg="загрзука"
          text="CSV Аналитик"
          isActive={locationPath == '/'}
        />

        <AppHeaderNavLinkUI
          url="/generator"
          pathImg="./generator-icon.svg"
          altImg="генератор"
          text="CSV Генератор"
          isActive={locationPath == '/generator'}
        />

        <AppHeaderNavLinkUI
          url="/history"
          pathImg="./history-icon.svg"
          altImg="история"
          text="История"
          isActive={locationPath == '/history'}
        />
      </nav>
    </div>
  </header>
);
