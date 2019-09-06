import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeaModule } from './modules/idea/idea.module';

@Module({
  imports: [TypeOrmModule.forRoot(), IdeaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
