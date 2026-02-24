# Ветеринарная клиника «Все создания от мала до велика» в Дальнем Константинове

Сайт реальной ветеринарной клиники с онлайн-записью и SEO-оптимизированной структурой страниц.

## Демо

https://www.vetotmaladovelika.ru/

## Что сделано

- многостраничный сайт на `React + Vite`;
- страницы: услуги, отзывы, статьи, запись, контакты, отдельная SEO-страница о клинике;
- форма записи с валидацией и отправкой заявки на backend-эндпоинт;
- раздел статей с фильтрами, поиском и модальными карточками;
- базовое SEO: `title`, `description`, `canonical`, Open Graph, `robots.txt`, `sitemap.xml`, JSON-LD;
- e2e-тесты ключевых сценариев (`Playwright`);
- CI в `GitHub Actions` (`lint` + `build` + `test`).

## Стек

`React`, `React Router`, `Vite`, `SCSS`, `Framer Motion`, `ESLint`, `Playwright`, `GitHub Actions`.

## Запуск

```bash
npm install
npm run dev
```

Production:

```bash
npm run build
npm run preview
```

Проверки:

```bash
npm run lint
npm run validate:articles
npm run test
```

## Env

Используется переменная:

- `VITE_FORM_ENDPOINT` — endpoint для отправки заявок.

Fallback: `/api/send-lead.php`.

## Роль

`Frontend Developer (solo)`

Архитектура, UI, адаптив, форма записи, SEO-настройка, тесты и CI.

## Лицензия

`All rights reserved`
