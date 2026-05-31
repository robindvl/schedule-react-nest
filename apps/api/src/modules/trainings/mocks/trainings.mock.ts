import type { TrainingData } from '@repo/domain';
import { TRAINING_DIRECTION_NAMES } from '@repo/domain';

const studio = {
  id: 'studio-seligerskaya',
  name: 'Селигерская',
  country: 'Россия',
  city: 'Москва',
  address: 'ул. Селигерская, 1',
};

const room = {
  id: 'room-1',
  name: 'Корт 1',
};

const trainer = {
  id: 'trainer-1',
  firstName: 'Алена',
  lastName: 'Матасова',
  photo: null,
  grade: {
    id: 'grade-d',
    name: 'D',
  },
  exerciseDirections: [] as [],
  bio: null,
};

const firstTrainingDirection = {
  id: 1,
  name: TRAINING_DIRECTION_NAMES.FIRST_TRAINING,
  description: 'Первая пробная тренировка для новичков',
  photo: null,
  whatToTake: 'Спортивная форма',
  photoWeb: null,
  duration: '60',
  technicalBreakBeforeDuration: null,
  technicalBreakAfterDuration: null,
};

const splitDDirection = {
  id: 2,
  name: TRAINING_DIRECTION_NAMES.SPLIT_D,
  description: 'Сплит уровня D',
  photo: null,
  whatToTake: 'Ракетка',
  photoWeb: null,
  duration: '120',
  technicalBreakBeforeDuration: null,
  technicalBreakAfterDuration: null,
};

const groupType = {
  id: 1,
  name: 'Групповая',
  color: 'gold',
  format: 'GROUP' as const,
};

export const mockTrainings: TrainingData[] = [
  {
    id: 'training-1',
    direction: firstTrainingDirection,
    type: groupType,
    timeFrom: '2026-05-31T20:00:00+03:00',
    timeTo: '2026-05-31T21:00:00+03:00',
    clientsCount: 1,
    maxClientsCount: 1,
    girlsOnly: false,
    studio,
    room,
    roomPartGroup: null,
    availableSpots: [],
    trainers: [trainer],
    cancellationDeadline: '2026-05-31T18:00:00+03:00',
    inBooking: false,
    inWaitlist: false,
    inReserve: false,
    availableClientSubscriptions: [],
    availableClientOneTimes: [],
    customFields: [],
    requirements: [],
  },
  {
    id: 'training-2',
    direction: splitDDirection,
    type: groupType,
    timeFrom: '2026-06-01T19:00:00+03:00',
    timeTo: '2026-06-01T21:00:00+03:00',
    clientsCount: 3,
    maxClientsCount: 4,
    girlsOnly: false,
    studio,
    room,
    roomPartGroup: null,
    availableSpots: [],
    trainers: [trainer],
    cancellationDeadline: '2026-06-01T17:00:00+03:00',
    inBooking: false,
    inWaitlist: false,
    inReserve: false,
    availableClientSubscriptions: [],
    availableClientOneTimes: [],
    customFields: [],
    requirements: [],
  },
];
