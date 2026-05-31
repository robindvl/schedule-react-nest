export const TOURNAMENT_STATUS_LABELS: Record<string, string> = {
  REGISTRATION: 'Регистрация',
  RUNNING: 'В процессе',
  CANCELED: 'Отменён',
  COMPLETED: 'Завершён',
} as const;

export const TOURNAMENT_GENDER_LABELS: Record<string, string> = {
  MIXED: 'Смешанный',
  FEMALE: 'Женский',
  MALE: 'Мужской',
} as const;
