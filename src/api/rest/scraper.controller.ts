import { Controller, Get } from '@nestjs/common';
import {ScraperRepositoryImpl} from '../../implementations/scraper.implementation';

@Controller()
export class ScraperController {
  constructor(private readonly appService: ScraperRepositoryImpl) {}

  @Get('/get-all-news-info')
  getAllNews() {
    return this.appService.findAll();
  }

  @Get('/get-filter-1')
  getFilter1() {
    return this.appService.filter1();
  }

  @Get('/get-filter-2')
  getFilter2() {
    return this.appService.filter2();
  }
}
