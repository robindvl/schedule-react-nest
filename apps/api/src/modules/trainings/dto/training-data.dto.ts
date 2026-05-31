import { ApiProperty } from '@nestjs/swagger';
import type { TrainingData } from '@repo/domain';

import { DirectionDto } from './direction.dto';
import { RoomDto } from './room.dto';
import { StudioDto } from './studio.dto';
import { TrainerDto } from './trainer.dto';
import { TrainingTypeDto } from './training-type.dto';

export class TrainingDataDto implements TrainingData {
  @ApiProperty()
  id!: string;

  @ApiProperty({ type: DirectionDto })
  direction!: DirectionDto;

  @ApiProperty({ type: TrainingTypeDto })
  type!: TrainingTypeDto;

  @ApiProperty()
  timeFrom!: string;

  @ApiProperty()
  timeTo!: string;

  @ApiProperty()
  clientsCount!: number;

  @ApiProperty()
  maxClientsCount!: number;

  @ApiProperty()
  girlsOnly!: boolean;

  @ApiProperty({ type: StudioDto })
  studio!: StudioDto;

  @ApiProperty({ type: RoomDto })
  room!: RoomDto;

  @ApiProperty({ type: String, nullable: true })
  roomPartGroup!: TrainingData['roomPartGroup'];

  @ApiProperty({ type: 'array', items: { type: 'object' } })
  availableSpots!: TrainingData['availableSpots'];

  @ApiProperty({ type: [TrainerDto] })
  trainers!: TrainerDto[];

  @ApiProperty()
  cancellationDeadline!: string;

  @ApiProperty()
  inBooking!: boolean;

  @ApiProperty()
  inWaitlist!: boolean;

  @ApiProperty()
  inReserve!: boolean;

  @ApiProperty({ type: 'array', items: { type: 'object' } })
  availableClientSubscriptions!: TrainingData['availableClientSubscriptions'];

  @ApiProperty({ type: 'array', items: { type: 'object' } })
  availableClientOneTimes!: TrainingData['availableClientOneTimes'];

  @ApiProperty({ type: 'array', items: { type: 'object' } })
  customFields!: TrainingData['customFields'];

  @ApiProperty({ type: 'array', items: { type: 'object' } })
  requirements!: TrainingData['requirements'];
}
