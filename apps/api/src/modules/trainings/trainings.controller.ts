import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import type { TrainingData } from '@repo/domain';
import { TrainingDataDto } from './dto';
import { TrainingsService } from './trainings.service';

@ApiTags('trainings')
@Controller('trainings')
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) {}

  @Get()
  @ApiOperation({ operationId: 'findAllTrainings' })
  @ApiOkResponse({ type: TrainingDataDto, isArray: true })
  findAll(): Promise<TrainingData[]> {
    return this.trainingsService.findAll();
  }

  @Get('first')
  @ApiOperation({ operationId: 'findFirstTrainings' })
  @ApiOkResponse({ type: TrainingDataDto, isArray: true })
  findFirstTrainings(): Promise<TrainingData[]> {
    return this.trainingsService.findFirstTrainings();
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
}
