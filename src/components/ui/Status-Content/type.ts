type StatusTypes = 'default' | 'done' | 'error' | string;
export type StatusContentProps = {
  status?: StatusTypes;
  statusText: string;
  descriptionText: string;
  onDelete?: () => void;
};
