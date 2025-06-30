import { Link } from 'react-router-dom';

import { type AppHeaderNavLinkUIProps } from './type';
import styles from './AppHeaderNavLink.module.css';

export const AppHeaderNavLinkUI = ({
  url,
  pathImg,
  altImg,
  text,
  stylesClass = '',
  isActive,
}: AppHeaderNavLinkUIProps) => (
  <Link
    to={url}
    role="button"
    className={`
        ${styles['header__nav-link-wrapper']}
        ${isActive ? styles['header__nav-link-wrapper_active'] : ''}`}
  >
    <img src={pathImg} alt={altImg} loading="lazy" decoding="async" />
    <span className={`${stylesClass}`}>{text}</span>
  </Link>
);
