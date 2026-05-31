# Schedule Widget — Monorepo

Монорепозиторий с виджетом записи на тренировки и турниры. Бэкенд-прокси (NestJS) ходит в VivaCRM (тренировки) и PadlHub (турниры). Хост (React/Vite) подключает виджет через Module Federation. Стек: pnpm, Turborepo, TanStack Query, TanStack Router, OpenAPI-генерация (`@hey-api/openapi-ts`).

## Быстрый старт

```bash
pnpm install
pnpm run dev
```

- API: `http://localhost:5000` (префикс `/api`)
- Web: `http://localhost:5173` (прокси `/api` → API)

Отдельно виджет в dev: `pnpm --filter @widget/tournament-widget dev`.

## Структура

```
├── apps/
│   ├── web/                    # Хост (React/Vite, FSD)
│   └── api/                    # NestJS-прокси
│       └── src/external-api/
│           ├── vivacrm/        # OpenAPI + @generated клиент
│           └── padlhub/
├── widgets/
│   └── tournament-widget/    # Remote (Module Federation)
├── packages/
│   ├── domain/                 # TrainingData, TournamentData, репозитории
│   ├── ui/                     # Общие UI-компоненты
│   ├── eslint-config/
│   └── typescript-config/
└── turbo.json
```

## Задача

Единый UI для расписания: тренировки из VivaCRM и турниры из PadlHub отображаются одним виджетом (`TournamentWidget`). В домене — отдельные модели `TrainingData` и `TournamentData`. На бэкенде — абстрактные репозитории и DI: сейчас подключены HTTP-реализации (`TrainingRepositoryVivacrm`, `TournamentRepositoryPadlhub`); mock-репозитории остаются для локальной разработки и тестов.

## Внешние API

| Источник | Спека | Ручки (прокси) |
|----------|--------|----------------|
| VivaCRM | `apps/api/src/external-api/vivacrm/vivacrm.opanapi.yaml` | `GET /exercises?date=`, `GET /exercises/:id` |
| PadlHub | `apps/api/src/external-api/padlhub/opanapi.yaml` | `GET /tournaments?date=`, `GET /tournaments/:id` |

Генерация клиентов:

```bash
pnpm --filter api generate:vivacrm
pnpm --filter api generate:padlhub
```

Полный цикл (домен + внешние клиенты + Swagger Nest + SDK для web):

```bash
pnpm run generate:api
```

Сгенерированные клиенты в `external-api/**/@generated` (в gitignore). Подмена mock → HTTP — в `trainings.module.ts` / `tournaments.module.ts`.

## Фронтенд

`apps/web`: FSD, API через `app/providers` и сгенерированный SDK (`src/app/@generated/api`). Страницы не зависят от VivaCRM/PadlHub напрямую — только от своего REST `/api/trainings` и `/api/tournaments`.

Список за день: обязательный query-параметр `?date=YYYY-MM-DD`. При смене даты виджет остаётся на экране, `loading` показывает подгрузку (`keepPreviousData` в React Query).

## Виджет

`widgets/tournament-widget` — remote `TournamentWidget`. Принимает:

- `items: TournamentSignupCard[]` — карточки (маппинг на страницах из `TrainingData` / `TournamentData`);
- `selectedDateId`, `onDateChange` — полоса из 14 дней вперёд от «сегодня» (Europe/Moscow);
- `loading` — индикатор загрузки списка;
- `activeSection`: `trainings` | `tournaments`.

Виджет не знает про внешние API и не различает VivaCRM и PadlHub — только props. Поэтому объединённая лента — задача страницы/хоста, а не виджета.

## Страницы

| Страница | API | Маппинг |
|----------|-----|---------|
| `/trainings` | `GET /api/trainings?date=` | `mapTrainingsToWidgetItems` → `TournamentSignupCard[]` |
| `/tournaments` | `GET /api/tournaments?date=` | `mapTournamentsToWidgetItems` → `TournamentSignupCard[]` |

Деталка карточки: `onLoadDetail` → `GET /api/trainings/:id` или `/api/tournaments/:id`.

Сейчас тренировки и турниры — **две отдельные страницы** и два REST-контракта. Архитектура к этому готова: оба источника маппятся в один формат `TournamentSignupCard[]` и отдаются в один `TournamentWidget`. **При необходимости страницы можно объединить**, смешивая данные из VivaCRM и PadlHub в **единой ленте** на выбранную дату (два параллельных запроса → `concat`/`sort` по `timeFrom` / `startsAt` → один `items` в виджет). Либо на уровне `api`, либо `web`.

## Уровни абстракции

| Уровень | Механизм | Что можно заменить |
|---------|----------|-------------------|
| Бэкенд | `TrainingRepositoryAbstract` / `TournamentRepositoryAbstract` + DI | VivaCRM, PadlHub, mock |
| Web | `app/providers`, OpenAPI SDK | другой бэкенд с тем же контрактом |
| Виджет | `TournamentSignupCard[]`, `loading`, `selectedDateId` | любой источник после маппинга на странице |

Изменение источника данных на бэкенде не требует правок в сервисах; смена контракта REST — регенерация SDK и адаптеры в `pages/*/model`.
