import { ButtonDeleteUI } from '../';
import { type StatusContentProps } from './type';
import styles from './StatusContent.module.css';

export const StatusContentUI = ({
  status = 'default',
  statusText,
  descriptionText,
  onDelete,
}: StatusContentProps) => (
  <div className={styles['status-content']}>
    <div className={styles['status-content__controls']}>
      <div
        className={`
            ${styles['status-content__process-status']}
            ${
              status == 'done'
                ? styles['status-content__process-status_done']
                : status == 'error'
                  ? styles['status-content__process-status_error']
                  : styles['status-content__process-status_deafult']
            }
          `}
      >
        {statusText}
      </div>
      <ButtonDeleteUI onDelete={onDelete} />
    </div>
    <div
      className={`
        ${styles['status-content__description-text']}
        ${
          status === 'error'
            ? styles['status-content__description-text_error']
            : ''
        }
        `}
    >
      {descriptionText}
    </div>
  </div>
);
