import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
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

const DATE_QUERY = {
  name: 'date',
  required: true,
  description: 'Calendar date (YYYY-MM-DD)',
  example: '2026-06-01',
} as const;

@ApiTags('tournaments')
@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Get()
  @ApiOperation({ operationId: 'findAllTournaments' })
  @ApiQuery(DATE_QUERY)
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Comma-separated tournament statuses (filtered after fetch)',
    example: 'REGISTRATION,RUNNING',
  })
  @ApiOkResponse({ type: TournamentDataDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Query parameter "date" is required' })
  findAll(
    @Query('date') date?: string,
    @Query('status') status?: string,
  ): Promise<TournamentData[]> {
    const resolvedDate = this.requireDate(date);

    if (status) {
      return this.tournamentsService.findByStatus(
        resolvedDate,
        status.split(',').map((item) => item.trim()),
      );
    }

    return this.tournamentsService.findAll(resolvedDate);
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

  private requireDate(date?: string): string {
    if (!date?.trim()) {
      throw new BadRequestException('Query parameter "date" is required');
    }

    return date.trim();
  }
}
