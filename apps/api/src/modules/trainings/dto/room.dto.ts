import { ApiProperty } from '@nestjs/swagger';
import type { RoomData } from '@repo/domain';

export class RoomDto implements RoomData {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;
}
