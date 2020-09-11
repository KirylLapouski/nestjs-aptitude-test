import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'profile',
      protoPath: join(__dirname, '../src/profile/profile.proto'),
      url: '0.0.0.0:3000'
    },
  });
  app.listen(() => {
    console.log('app started');
  });
}

bootstrap();
