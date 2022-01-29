import {ScraperRepository} from '../domain/repository/scraper.repository';
import {Injectable} from '@nestjs/common';
import {NewInfo} from '../domain/interface/scraper.interface';
import * as puppeteer from 'puppeteer';
import {filterAndOrder} from '../helpers/helpers';

@Injectable()
export class ScraperRepositoryImpl implements ScraperRepository {
  constructor() {}
  async findAll(): Promise<NewInfo[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', (request) => {
          if (request.resourceType() === 'document') {
            request.continue();
          } else {
            request.abort();
          }
        });
        await page.goto("https://news.ycombinator.com/");
        let urls = [];
        await page.waitForSelector('span.pagetop');
        let newUrls = await page.evaluate(() => {
          let results = [];
          let header = document.querySelectorAll('tr.athing');
          let content = document.querySelectorAll('td.subtext');
          const checkIfExists = (element) => {
            return element ? element.textContent : '0';
          }
          const getComments = (html: string) => {
            const rgx = new RegExp(/\>([0-9]+)\&nbsp\;comments/g)
            const matches = rgx.exec(html);
            return matches && matches .length > 0 ? matches[1] : '0';
          }
          header.forEach((e, i) => {
            results.push({
              order: i + 1,
              title: e.querySelector('a.titlelink')['innerText'],
              points: parseInt(checkIfExists(content[i].querySelector('span.score')).match('[0-9]+')[0]),
              comments: parseInt(getComments(content[i].outerHTML))
            })
          })
          return results;
        });
        urls = urls.concat(newUrls);
        await browser.close();
        return resolve(urls);
      } catch (e) {
        return reject(e);
      }
    })
  }

  async filter1(): Promise<any> {
    return new Promise((async (resolve, reject) => {
      try {
        let newsInfo = await this.findAll();
        return resolve(filterAndOrder(newsInfo, 'title', 'comments', 1));
      } catch (e) {
        return reject(e);
      }
    }))
  }

  async filter2(): Promise<any> {
    return new Promise((async (resolve, reject) => {
      try {
        let newsInfo = await this.findAll();
        return resolve(filterAndOrder(newsInfo, 'title', 'points', 0));
      } catch (e) {
        return reject(e);
      }
    }))
  }
}
