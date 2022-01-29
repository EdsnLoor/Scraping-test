import {NewInfo} from '../domain/interface/scraper.interface';

export const filterAndOrder = (array: NewInfo[], filterParam: string, orderParam: string, idx: number) => {
  const filteredNewsInfo = array.filter((e) => idx === 1 ? e[filterParam].split(' ').length > 5 : e[filterParam].split(' ').length < 5);
  return filteredNewsInfo.sort((a, b) => a[orderParam] - b[orderParam]);
}
