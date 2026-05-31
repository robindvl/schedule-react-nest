import { ApiProperty } from '@nestjs/swagger';
import type { StudioData } from '@repo/domain';

export class StudioDto implements StudioData {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  country!: string;

  @ApiProperty()
  city!: string;

  @ApiProperty()
  address!: string;
}
