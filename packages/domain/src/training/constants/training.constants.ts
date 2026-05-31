export const TRAINING_DIRECTION_NAMES = {
  FIRST_TRAINING: 'Первая пробная тренировка',
  SPLIT_D: 'Сплит D',
  SPLIT_D_PLUS: 'Сплит D+',
  GAME_PLUS_TRAINER_D: 'Игра+Тренер. Уровень D',
  GAME_PLUS_TRAINER_D_PLUS: 'Игра+Тренер. Уровень D+',
} as const;

export const TRAINING_DURATION = {
  ONE_HOUR: 60,
  TWO_HOURS: 120,
} as const;

export type TrainingDirectionName =
  (typeof TRAINING_DIRECTION_NAMES)[keyof typeof TRAINING_DIRECTION_NAMES];
