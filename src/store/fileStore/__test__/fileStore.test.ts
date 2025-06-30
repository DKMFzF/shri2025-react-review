import { useFileStore } from '../fileStore';
import { describe, expect, it, beforeEach } from 'vitest';

const initialState = useFileStore.getState();

beforeEach(() => {
  useFileStore.setState(initialState);
});

describe('State useFileStore', () => {
  describe('Базовые установщики состояния', () => {
    it('должно устанавливать имя файла', () => {
      useFileStore.getState().setFileName('test.csv');
      expect(useFileStore.getState().fileName).toBe('test.csv');
    });

    it('должно устанавливать файл', () => {
      const file = new File(['content'], 'test.csv');
      useFileStore.getState().setFile(file);
      expect(useFileStore.getState().file).toBe(file);
    });

    it('должно устанавливать состояние перетаскивания', () => {
      useFileStore.getState().setIsDragging(true);
      expect(useFileStore.getState().isDragging).toBe(true);
    });

    it('должно устанавливать статус загрузки файла', () => {
      useFileStore.getState().setIsUploaded(true);
      expect(useFileStore.getState().isUploaded).toBe(true);
    });
  });

  describe('Обработка файлов', () => {
    it('должно обрабатывать валидный CSV файл', () => {
      const file = new File(['content'], 'test.csv');
      const fileList = {
        0: file,
        length: 1,
        item: () => file,
      } as unknown as FileList;

      useFileStore.getState().processFiles(fileList);

      const state = useFileStore.getState();
      expect(state.fileName).toBe('test.csv');
      expect(state.file).toBe(file);
      expect(state.isUploaded).toBe(true);
      expect(state.error).toBe(false);
    });

    it('должно отклонять файлы не CSV формата', () => {
      const file = new File(['content'], 'test.txt');
      const fileList = {
        0: file,
        length: 1,
        item: () => file,
      } as unknown as FileList;

      useFileStore.getState().processFiles(fileList);

      const state = useFileStore.getState();
      expect(state.fileName).toBe('test.txt');
      expect(state.file).toBeNull();
      expect(state.isUploaded).toBe(false);
      expect(state.error).toBe(true);
    });
  });

  describe('Сброс состояния', () => {
    it('должно сбрасывать все значения к начальным', () => {
      useFileStore.setState({
        fileName: 'test.csv',
        file: new File(['content'], 'test.csv'),
        isDragging: true,
        isUploaded: true,
        error: true,
      });

      useFileStore.getState().reset();

      expect(useFileStore.getState()).toEqual({
        fileName: null,
        file: null,
        isDragging: false,
        isUploaded: false,
        error: false,
        setFileName: expect.any(Function),
        setFile: expect.any(Function),
        setIsDragging: expect.any(Function),
        setIsUploaded: expect.any(Function),
        processFiles: expect.any(Function),
        reset: expect.any(Function),
      });
    });
  });

  describe('Крайние случаи', () => {
    it('должно обрабатывать null при установке имени файла', () => {
      useFileStore.getState().setFileName(null);
      expect(useFileStore.getState().fileName).toBeNull();
    });

    it('должно обрабатывать null при установке файла', () => {
      useFileStore.getState().setFile(null);
      expect(useFileStore.getState().file).toBeNull();
    });

    it('не должно изменять другие состояния при обновлении одного свойства', () => {
      useFileStore.setState({
        fileName: 'exist.csv',
        file: new File(['content'], 'exist.csv'),
        isUploaded: true,
      });

      useFileStore.getState().setIsDragging(true);

      const state = useFileStore.getState();
      expect(state.isDragging).toBe(true);
      expect(state.fileName).toBe('exist.csv');
      expect(state.file?.name).toBe('exist.csv');
      expect(state.isUploaded).toBe(true);
    });
  });
});
