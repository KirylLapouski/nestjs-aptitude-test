import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileController } from './profile/profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Profile} from "./profile/profile.entity"
import { ProfileSubscriber } from './profile/profile.subscriber';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'profile',
      entities: [Profile],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Profile])
  ],
  controllers: [AppController, ProfileController],
  providers: [AppService, ProfileSubscriber],
})
export class AppModule {}
