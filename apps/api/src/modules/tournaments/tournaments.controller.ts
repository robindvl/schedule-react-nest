import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import type { TournamentData } from '@repo/domain';
import { TournamentDataDto } from './dto';
import { TournamentsService } from './tournaments.service';

@ApiTags('tournaments')
@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Get()
  @ApiOperation({ operationId: 'findAllTournaments' })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Comma-separated tournament statuses',
    example: 'REGISTRATION,RUNNING',
  })
  @ApiOkResponse({ type: TournamentDataDto, isArray: true })
  findAll(@Query('status') status?: string): Promise<TournamentData[]> {
    if (status) {
      return this.tournamentsService.findByStatus(
        status.split(',').map((item) => item.trim()),
      );
    }

    return this.tournamentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ operationId: 'findTournamentById' })
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: TournamentDataDto })
  @ApiNotFoundResponse({ description: 'Tournament not found' })
  async findById(@Param('id') id: string): Promise<TournamentData> {
    const tournament = await this.tournamentsService.findById(id);

    if (!tournament) {
      throw new NotFoundException(`Tournament with id "${id}" not found`);
    }

    return tournament;
  }
}
