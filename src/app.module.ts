import { Module } from '@nestjs/common';
import {ScraperModule} from './module/scraper.module';


@Module({
  imports: [
    ScraperModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
