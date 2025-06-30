import { type HighlightsCardUIProps } from './type';
import styles from './HighlightsCard.module.css';

export const HighlightsCardUI = ({
  meaning,
  description,
  isSpecial = false,
}: HighlightsCardUIProps) => {
  return (
    <article
      className={`${styles['highlights-card']} ${isSpecial ? styles['highlights-card_special'] : 'highlights-card_default'}`}
    >
      <div className={styles['highlights-card__meaning']}>{meaning}</div>
      <div>{description}</div>
    </article>
  );
};
