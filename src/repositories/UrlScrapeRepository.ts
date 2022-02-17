import URLsModel from '../models/URLs.model';
import URLInfo from '../models/entities/URLInfo';
import config from '../config';
import { Op } from 'sequelize';
const { sequelizeConnection: sequelize } = config;
export class URLScrapeRepository {

    async get(params) {      
      const { skip = 0, limit = 10, urlString, type, urls } = params;
      const query = { 
        where: { 
          ...urlString &&  { url: {
            [Op.like]: `%${urlString}%` 
          }},
          ...type &&  { type },
          ...urls && { url: urls }
        }, 
        offset: parseInt(skip),
        limit: parseInt(limit),
      };
      const count = await URLsModel.count(query);
      const items = await URLsModel.findAll(query)
      return { items, count}
    }

    async saveAllUrlData(urlInfoList:URLInfo[], urls:String[]) {
        (async () => {
          console.log(urlInfoList);
            const t = await sequelize.transaction();
            await URLsModel.destroy({
                where: {
                  url: urls
                },transaction: t
            });
            await URLsModel.bulkCreate(urlInfoList,{transaction:t})
            await t.commit();
          })().then(()=>{
            // sequelize.close()
          })
          .catch(error =>{console.error
            (error)}) 
    }
}