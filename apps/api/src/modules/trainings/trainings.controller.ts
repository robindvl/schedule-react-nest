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
import type { TrainingData } from '@repo/domain';
import { TrainingDataDto } from './dto';
import { TrainingsService } from './trainings.service';

const DATE_QUERY = {
  name: 'date',
  required: true,
  description: 'Calendar date (YYYY-MM-DD)',
  example: '2026-06-02',
} as const;

@ApiTags('trainings')
@Controller('trainings')
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) {}

  @Get()
  @ApiOperation({ operationId: 'findAllTrainings' })
  @ApiQuery(DATE_QUERY)
  @ApiOkResponse({ type: TrainingDataDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Query parameter "date" is required' })
  findAll(@Query('date') date?: string): Promise<TrainingData[]> {
    const resolvedDate = this.requireDate(date);
    return this.trainingsService.findAll(resolvedDate);
  }

  @Get('first')
  @ApiOperation({ operationId: 'findFirstTrainings' })
  @ApiQuery(DATE_QUERY)
  @ApiOkResponse({ type: TrainingDataDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Query parameter "date" is required' })
  findFirstTrainings(@Query('date') date?: string): Promise<TrainingData[]> {
    const resolvedDate = this.requireDate(date);
    return this.trainingsService.findFirstTrainings(resolvedDate);
  }

  @Get(':id')
  @ApiOperation({ operationId: 'findTrainingById' })
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: TrainingDataDto })
  @ApiNotFoundResponse({ description: 'Training not found' })
  async findById(@Param('id') id: string): Promise<TrainingData> {
    const training = await this.trainingsService.findById(id);

    if (!training) {
      throw new NotFoundException(`Training with id "${id}" not found`);
    }

    return training;
  }

  private requireDate(date?: string): string {
    if (!date?.trim()) {
      throw new BadRequestException('Query parameter "date" is required');
    }

    return date.trim();
  }
}
