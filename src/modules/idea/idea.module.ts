import { Module, CacheModule } from '@nestjs/common';
import { IdeaController } from '../../controllers/idea/idea.controller';
import { IdeaService } from '../../services/idea/idea.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeaEntity } from '../../entity/idea.entity';
import { UserEntity } from '../../entity/user.entity';

@Module({
  imports: [CacheModule.register(), TypeOrmModule.forFeature([IdeaEntity, UserEntity])],
  controllers: [IdeaController],
  providers: [IdeaService],
})
export class IdeaModule {}
