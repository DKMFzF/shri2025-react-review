import { renderHook } from '@testing-library/react';
import { describe, expect, vi, it, beforeEach } from 'vitest';
import { useDragAndDrop } from '../useDragAndDrop';
import { type UseDragAndDropProps } from '../type';

describe('Хук useDragAndDrop', () => {
  const mockOnFilesSelected = vi.fn();
  const mockOnDragStateChange = vi.fn();

  const setup = (props: Partial<UseDragAndDropProps> = {}) => {
    const initialProps: UseDragAndDropProps = {
      onFilesSelected: mockOnFilesSelected,
      onDragStateChange: mockOnDragStateChange,
      ...props,
    };

    return renderHook(() => useDragAndDrop(initialProps));
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('должен возвращать ref и обработчики событий', () => {
    const { result } = setup();

    expect(result.current.fileInputRef).toBeDefined();
    expect(result.current.handleButtonClick).toBeInstanceOf(Function);
    expect(result.current.handleFileChange).toBeInstanceOf(Function);
    expect(result.current.handleDrag).toBeInstanceOf(Function);
    expect(result.current.handleDrop).toBeInstanceOf(Function);
  });

  describe('Обработчик handleButtonClick', () => {
    it('должен вызывать click на input элементе', () => {
      const { result } = setup();
      const mockClick = vi.fn();
      
      result.current.fileInputRef.current = {
        click: mockClick,
      } as unknown as HTMLInputElement;

      result.current.handleButtonClick();
      
      expect(mockClick).toHaveBeenCalled();
    });

    it('не должен выбрасывать ошибку если ref равен null', () => {
      const { result } = setup();
      
      result.current.fileInputRef.current = null;
      
      expect(() => result.current.handleButtonClick()).not.toThrow();
    });
  });

  describe('Обработчик handleFileChange', () => {
    it('должен вызывать onFilesSelected при выборе файлов', () => {
      const { result } = setup();
      const mockFiles = [new File(['content'], 'file.txt')];
      const mockEvent = {
        target: {
          files: mockFiles,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      result.current.handleFileChange(mockEvent);
      
      expect(mockOnFilesSelected).toHaveBeenCalledWith(mockFiles);
    });

    it('не должен вызывать onFilesSelected если файлы не выбраны', () => {
      const { result } = setup();
      const mockEvent = {
        target: {
          files: null,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      result.current.handleFileChange(mockEvent);
      
      expect(mockOnFilesSelected).not.toHaveBeenCalled();
    });
  });

  describe('Обработчик handleDrag', () => {
    it('должен предотвращать поведение по умолчанию и останавливать всплытие', () => {
      const { result } = setup();
      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        type: 'dragenter',
      } as unknown as React.DragEvent;

      result.current.handleDrag(mockEvent);
      
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
    });

    it('должен вызывать onDragStateChange(true) для событий dragenter/dragover', () => {
      const { result } = setup();
      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        type: 'dragenter',
      } as unknown as React.DragEvent;

      result.current.handleDrag(mockEvent);
      
      expect(mockOnDragStateChange).toHaveBeenCalledWith(true);
    });

    it('должен вызывать onDragStateChange(false) для других событий', () => {
      const { result } = setup();
      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        type: 'dragleave',
      } as unknown as React.DragEvent;

      result.current.handleDrag(mockEvent);
      
      expect(mockOnDragStateChange).toHaveBeenCalledWith(false);
    });

    it('не должен вызывать onDragStateChange если он не передан', () => {
      const { result } = setup({ onDragStateChange: undefined });
      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        type: 'dragenter',
      } as unknown as React.DragEvent;

      result.current.handleDrag(mockEvent);
      
      expect(mockOnDragStateChange).not.toHaveBeenCalled();
    });
  });

  describe('Обработчик handleDrop', () => {
    it('должен предотвращать поведение по умолчанию и останавливать всплытие', () => {
      const { result } = setup();
      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        dataTransfer: { files: [] },
      } as unknown as React.DragEvent;

      result.current.handleDrop(mockEvent);
      
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
    });

    it('должен вызывать onDragStateChange(false)', () => {
      const { result } = setup();
      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        dataTransfer: { files: [] },
      } as unknown as React.DragEvent;

      result.current.handleDrop(mockEvent);
      
      expect(mockOnDragStateChange).toHaveBeenCalledWith(false);
    });

    it('должен вызывать onFilesSelected при наличии файлов', () => {
      const { result } = setup();
      const mockFiles = [new File(['content'], 'file.txt')];
      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        dataTransfer: { files: mockFiles },
      } as unknown as React.DragEvent;

      result.current.handleDrop(mockEvent);
      
      expect(mockOnFilesSelected).toHaveBeenCalledWith(mockFiles);
    });

    it('не должен вызывать onFilesSelected если файлы отсутствуют', () => {
      const { result } = setup();
      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        dataTransfer: { files: [] },
      } as unknown as React.DragEvent;

      result.current.handleDrop(mockEvent);
      
      expect(mockOnFilesSelected).not.toHaveBeenCalled();
    });
  });
});
