export type StatusCard = 'done' | 'error';
export type HistoryCardProps = {
  fileName: string;
  data: string;
  status: StatusCard;
  onDelete: (() => void) | undefined;
  onClick: (() => void) | undefined;
};
