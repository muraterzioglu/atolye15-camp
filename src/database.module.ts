import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        logNotifications: true,
        retryAttempts: 3,
        keepConnectionAlive: true,
        logger: 'advanced-console',

        type: 'postgres',
        port: 5438,
        host: 'localhost',
        username: 'postgres',
        password: 'postgres',
        database: 'atolye15',
        synchronize: false,
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
