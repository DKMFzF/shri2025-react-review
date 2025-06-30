export interface GeneratorStateProps {
  isLoading: boolean;
  error: string | null;
  downloadUrl: string | null;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setDownloadUrl: (url: string | null) => void;
  reset: () => void;
}
