import type { DirectionData } from './direction.entity';
import type { RoomData } from './room.entity';
import type { StudioData } from './studio.entity';
import type { TrainerData } from './trainer.entity';
import type { TrainingTypeData } from './training-type.entity';

export interface TrainingData {
  id: string;
  direction: DirectionData;
  type: TrainingTypeData;
  timeFrom: string;
  timeTo: string;
  clientsCount: number;
  maxClientsCount: number;
  girlsOnly: boolean;
  studio: StudioData;
  room: RoomData;
  roomPartGroup: string | null;
  availableSpots: Record<string, unknown>[];
  trainers: TrainerData[];
  cancellationDeadline: string;
  inBooking: boolean;
  inWaitlist: boolean;
  inReserve: boolean;
  availableClientSubscriptions: Record<string, unknown>[];
  availableClientOneTimes: Record<string, unknown>[];
  customFields: Record<string, unknown>[];
  requirements: Record<string, unknown>[];
}
