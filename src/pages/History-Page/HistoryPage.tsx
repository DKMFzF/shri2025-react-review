import { useEffect, useState } from 'react';
import { type HistoryItem } from '../../utils/type/historyItem';
import {
  HistoryCard,
  ButtonUI,
  HighlightsCardContainerUI,
} from '../../components/ui';
import styles from './HistoryPage.module.css';
import { Link } from 'react-router-dom';
import { Modal } from '../../components/Modal';

export const HistoryPage = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem('analysisHistory') || '[]'
    );
    const sortedHistory = savedHistory.sort(
      (a: HistoryItem, b: HistoryItem) => b.lastUpdated - a.lastUpdated
    );
    setHistory(sortedHistory);
  }, []);

  const handleDelete = (fileId: string) => {
    const newHistory = history.filter((item) => item.fileId !== fileId);
    setHistory(newHistory);
    localStorage.setItem('analysisHistory', JSON.stringify(newHistory));
  };

  const handleDeleteAll = () => {
    setHistory([]);
    localStorage.removeItem('analysisHistory');
  };

  const handleCardClick = (item: HistoryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className={styles['history-page']}>
      <ul className={styles['history-page__history-list']}>
        {history.map((item, index) => (
          <li key={index} className={styles['history-page__list-item']}>
            <HistoryCard
              fileName={item.fileName}
              data={item.date}
              status={item.status}
              onDelete={() => handleDelete(item.fileId)}
              onClick={() => handleCardClick(item)}
            />
          </li>
        ))}
        {history.length === 0 && (
          <div className={styles['history-page__empty']}>
            История аналитики пуста
          </div>
        )}
      </ul>
      <div className={styles['history-page__controls']}>
        <Link to="/generator">
          <ButtonUI type="send">Сгенерировать больше</ButtonUI>
        </Link>
        <ButtonUI
          type="clear"
          onClick={handleDeleteAll}
          disabled={history.length === 0}
        >
          Очистить всё
        </ButtonUI>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedItem && selectedItem.data && (
          <div className={styles['history-modal__highlights-container']}>
            <HighlightsCardContainerUI
              aggregatedData={selectedItem.data}
              isSpecial
            />
          </div>
        )}
      </Modal>
    </div>
  );
};
