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
        port: 6543,
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB,
        synchronize: false,
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
