import { fetchUrlData } from '../utils/scrapeMediaLinks';
import { IURLRequest } from '../models/requests/IURLRequest';
import { URLScrapeRepository } from '../repositories/UrlScrapeRepository';
import URLInfo from '../models/entities/URLInfo';

export class URLScrapeService {
  constructor(protected urlScrapeRepository: URLScrapeRepository) {
  }
  async get(params) {
    return await this.urlScrapeRepository.get(params);
  }

  async save(body: IURLRequest) {
    const { urls } = body;
    const urlsData:URLInfo[][]  = await Promise.all(urls.map(url => fetchUrlData(url)));
    const finalUrlData:URLInfo[] = urlsData.reduce((prev:URLInfo[],curr:URLInfo[]) => {
      const returnValue = [...prev, ...curr];
      return returnValue;
    },[]);
    
    // Save the scraped information 
    this.urlScrapeRepository.saveAllUrlData(finalUrlData, urls);
  }



}
