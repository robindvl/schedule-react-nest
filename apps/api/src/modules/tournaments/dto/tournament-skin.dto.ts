import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { TournamentSkinData } from '@repo/domain';

export class TournamentSkinDto implements TournamentSkinData {
  @ApiProperty()
  title!: string;

  @ApiProperty()
  subtitle!: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty({ type: String, nullable: true })
  imageUrl!: string | null;

  @ApiProperty()
  ctaLabel!: string;

  @ApiProperty({ type: [String] })
  tags!: string[];
}
