import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver } from '@nestjs/apollo';
import type { ApolloDriverConfig } from '@nestjs/apollo';
//
import { DatabaseModule } from './database.module';
//
import { AuthorsModule } from './authors/authors.module';
import { ContentsModule } from './contents/contents.module';
import { ReactionsModule } from './reactions/reactions.module';
//
import { AvatarsModule } from './avatars/avatars.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
      },
      autoSchemaFile: 'schema.gql',
      debug: true,
      playground: true,
    }),
    AvatarsModule, // Letter Avatar API
    DatabaseModule, // Database Connection
    // Modules
    AuthorsModule,
    ContentsModule,
    ReactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
