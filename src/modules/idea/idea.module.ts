import { Module } from '@nestjs/common';
import { IdeaController } from '../../controllers/idea/idea.controller';
import { IdeaService } from '../../services/idea/idea.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeaEntity } from '../../entity/idea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaEntity])],
  controllers: [IdeaController],
  providers: [IdeaService],
})
export class IdeaModule {}
