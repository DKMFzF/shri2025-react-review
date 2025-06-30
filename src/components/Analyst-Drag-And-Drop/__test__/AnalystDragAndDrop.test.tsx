import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { AnalystDragAndDrop } from '../AnalystDragAndDrop';
import { useFileStore } from '../../../store';
import { useDragAndDrop } from '../../../hooks';

vi.mock('../../../store');
vi.mock('../../../hooks');
vi.mock('../../ui', () => ({
  AnalystDragAndDropUI: vi.fn((props) => (
    <div>
      <div role="region" data-testid="drop-region" onDrop={props.onDrop}>
        Область для перетаскивания
      </div>
      <button 
        onClick={props.onButtonClick} 
        data-testid="upload-button"
      >
        Загрузить файл
      </button>
      <button onClick={props.onReset} data-testid="reset-button">
        Сбросить
      </button>
      <input
        type="file"
        ref={props.inputRef}
        onChange={props.onFileChange}
        data-testid="file-input"
      />
    </div>
  )),
}));

const mockUseFileStore = vi.mocked(useFileStore);
const mockUseDragAndDrop = vi.mocked(useDragAndDrop);

describe('Компонент AnalystDragAndDrop', () => {
  const mockOnReset = vi.fn();
  const mockProcessFiles = vi.fn();
  const mockSetIsDragging = vi.fn();
  
  const mockFileInputRef = {
    current: {
      click: vi.fn(),
    } as unknown as HTMLInputElement,
  };

  beforeEach(() => {
    mockUseFileStore.mockReturnValue({
      fileName: null,
      isDragging: false,
      processFiles: mockProcessFiles,
      setIsDragging: mockSetIsDragging,
      error: false,
    } as any);

    mockUseDragAndDrop.mockReturnValue({
      fileInputRef: mockFileInputRef,
      handleButtonClick: vi.fn(),
      handleFileChange: vi.fn(),
      handleDrag: vi.fn(),
      handleDrop: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('корректно отображается без ошибок', () => {
    render(
      <AnalystDragAndDrop onReset={mockOnReset} status="ready" isLoading={false} />
    );
    expect(screen.getByTestId('drop-region')).toBeInTheDocument();
  });

  it('передает корректные свойства в UI компонент', () => {
    const mockFileName = 'test.csv';
    mockUseFileStore.mockReturnValueOnce({
      fileName: mockFileName,
      isDragging: true,
      processFiles: mockProcessFiles,
      setIsDragging: mockSetIsDragging,
      error: false,
    } as any);

    render(
      <AnalystDragAndDrop onReset={mockOnReset} status="ready" isLoading={true} />
    );

    expect(mockUseDragAndDrop).toHaveBeenCalledWith({
      onFilesSelected: mockProcessFiles,
      onDragStateChange: mockSetIsDragging,
    });
  });

  it('корректно обрабатывает состояние ошибки', () => {
    mockUseFileStore.mockReturnValueOnce({
      fileName: null,
      isDragging: false,
      processFiles: mockProcessFiles,
      setIsDragging: mockSetIsDragging,
      error: true,
    } as any);

    render(
      <AnalystDragAndDrop onReset={mockOnReset} status="ready" isLoading={false} />
    );

    expect(mockUseDragAndDrop).toHaveBeenCalledWith({
      onFilesSelected: mockProcessFiles,
      onDragStateChange: mockSetIsDragging,
    });
  });

  it('вызывает функцию сброса при нажатии кнопки Reset', () => {
    render(
      <AnalystDragAndDrop onReset={mockOnReset} status="ready" isLoading={false} />
    );

    fireEvent.click(screen.getByTestId('reset-button'));
    expect(mockOnReset).toHaveBeenCalled();
  });

  it('обрабатывает перетаскивание и загрузку файлов', async () => {
    const mockFiles = [
      new File(['content'], 'test.csv', { type: 'text/csv' }),
    ] as unknown as FileList;

    const mockHandleDrop = vi.fn((e) => {
      if (e.dataTransfer.files?.length) {
        mockProcessFiles(e.dataTransfer.files);
      }
    });

    mockUseDragAndDrop.mockReturnValueOnce({
      fileInputRef: mockFileInputRef,
      handleButtonClick: vi.fn(),
      handleFileChange: vi.fn(),
      handleDrag: vi.fn(),
      handleDrop: mockHandleDrop,
    });

    render(
      <AnalystDragAndDrop onReset={mockOnReset} status="ready" isLoading={false} />
    );

    const dropZone = screen.getByTestId('drop-region');
    fireEvent.drop(dropZone, {
      dataTransfer: { files: mockFiles },
    });

    await waitFor(() => {
      expect(mockHandleDrop).toHaveBeenCalled();
      expect(mockProcessFiles).toHaveBeenCalledWith(mockFiles);
    });
  });

  it('корректно отображает состояние загрузки', () => {
    render(
      <AnalystDragAndDrop onReset={mockOnReset} status="ready" isLoading={true} />
    );

    expect(mockUseDragAndDrop).toHaveBeenCalledWith({
      onFilesSelected: mockProcessFiles,
      onDragStateChange: mockSetIsDragging,
    });
  });

  it('обрабатывает загрузку файлов через кнопку выбора', async () => {
    const mockFiles = [
      new File(['content'], 'test.csv', { type: 'text/csv' }),
    ] as unknown as FileList;

    const mockClick = vi.fn();

    const mockHandleButtonClick = vi.fn(() => {
      mockFileInputRef.current.click = mockClick;
      mockClick();
    });

    const mockHandleFileChange = vi.fn((e) => {
      if (e.target.files?.length) {
        mockProcessFiles(e.target.files);
      }
    });

    mockUseDragAndDrop.mockReturnValueOnce({
      fileInputRef: mockFileInputRef,
      handleButtonClick: mockHandleButtonClick,
      handleFileChange: mockHandleFileChange,
      handleDrag: vi.fn(),
      handleDrop: vi.fn(),
    });

    render(
      <AnalystDragAndDrop onReset={mockOnReset} status="ready" isLoading={false} />
    );

    const uploadButton = screen.getByTestId('upload-button');
    fireEvent.click(uploadButton);
    
    expect(mockHandleButtonClick).toHaveBeenCalled();
    expect(mockClick).toHaveBeenCalled();

    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: mockFiles } });

    await waitFor(() => {
      expect(mockHandleFileChange).toHaveBeenCalled();
      expect(mockProcessFiles).toHaveBeenCalledWith(mockFiles);
    });
  });
});
