import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { rabbitConfig } from '@project/shared-config';
import applicationConfig from './configurations/app.config';
import dbConfig from './configurations/postgres.config';

const ENV_CONTENT_FILE_PATH = 'apps/content/content.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, dbConfig, rabbitConfig],
      envFilePath: ENV_CONTENT_FILE_PATH,
    }),
  ],
})
export class ContentConfigModule {}
