import {NewInfo} from '../interface/scraper.interface';

export interface ScraperRepository {
  findAll(): Promise<NewInfo[]>;
  filter1(): Promise<NewInfo[]>;
  filter2(): Promise<NewInfo[]>;
}
