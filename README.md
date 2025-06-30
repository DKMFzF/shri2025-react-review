# Межгалактическая аналитика

## Навигация по документации

- [Описание проекта](#описание-проекта)
- [Тех-Стек](#техстек)
- [Установка и запуск](#установка-и-запуск)
- [Сборка](#сборка)
- [Описание слоёв](#описание-слоёв)
- [Остальные папки в проекте](#остальные-папки-в-проекте)
- [Тестирование приложения](#тестирование-приложения)

## Описание проекта

Проект сделан в рамках учебной программы Школы Разработки Интерфейсов Яндекса. Проект представляет собой функциональный клиент для обработки и генерации csv файлов.

## ТехСтек

- TS
- React
- Zustand
- Vite

## Установка и запуск

Для установки и запуска проекта выполните следующие команды

```bash
npm install
npm run dev
```

или

```bash
yarn
yarn dev
```

## Сборка

```bash
npm run build
```

или

```bash
yarn build
```

## Описание слоёв

- `src/app` — слой приложения
- `src/components/` — слой с ui-ем
- `src/api` — слой взаимодействия с api
- `src/services` — слой с бизнес логикой
- `src/store` — слой работы с данными

## Остальные папки в проекте

- `src/css` — хелперы для css
- `src/hooks` — хуки в прилоежнии
- `src/pages` — глобальные компоненты старниц
- `src/utils` — хелперы и часто используемые типы

### Дока бэка

[ссылка на репу](https://github.com/etozhenerk/shri2025-back)  
[описание бэкенда](https://github.com/etozhenerk/shri2025-back/blob/main/readme.md)

### Тестирование приложения

Для начала тестирования введите

```bash
npm run test
```

#### Описание тестов

- Тестирование states (unit-test)

  - `generatorStore.test.ts` - тестирования state генерации
  - `fileStore.test.ts` - тестирование state файла
  - `analystStore.test.ts` - тестирование state аналитики

- Тестирование запросов к API (unit-test)
  - `baseApi.test.ts` - тестирование базовго api
  - `reportsApi.test.ts` - тестирование reportsApi
  - `aggregateApi.test.ts` - тестирование aggregateApi

- Drag&Drop (unit-test)
  - `useDragAndDrop.test.ts` - тестирование хука drag&drop
  - `AnalystDragAndDrop.test.tsx` - тестирование компонента отвечающего за Drag&Drop. **В тестирование входит загрука файла перетаскиванием и загрузка на кнопку.**

- localStorage и хэндлеры агрегации данных (unit-test)
  - `handleDataChunk.test.ts` - тестирование хэдлера разбиения на чанки
  - `handleSubmitAggregatedData.test.ts` - тестирование хэндлера отправки даных.
  - `handleSubmitWrapperAggregatedData.test.ts` - тестирование wrapper-а агрегации даных.

- Тестирование Навигации (e2e-test)
  - `navigation.spec.ts` - тестирование переключение страниц

- Тестирование Loading-status (e2e-test)
  - `loader.spec.ts` - тестирование отображение прогресса обработки

