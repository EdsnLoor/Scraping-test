import { Module } from '@nestjs/common';
import {ScraperController} from '../api/rest/scraper.controller';
import {ScraperRepository} from '../domain/repository/scraper.repository';
import {ScraperRepositoryImpl} from '../implementations/scraper.implementation';
import {PuppeteerModule} from 'nest-puppeteer';
import {BrowserContext} from 'puppeteer';


const ScraperRepositoryFactory = {
  provide: 'ScraperRepository',
  useExisting: ScraperRepositoryImpl,
};


@Module({
  imports: [
    PuppeteerModule.forRoot(
      { pipe: true, isGlobal: true },
      'BrowserInstanceName',
    ),
    PuppeteerModule.forFeature()
  ],
  controllers: [ScraperController],
  providers: [ScraperRepositoryFactory, ScraperRepositoryImpl],
  exports: [],
})
export class ScraperModule {}
