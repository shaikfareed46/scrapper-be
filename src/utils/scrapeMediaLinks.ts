import axios from 'axios';
import cheerio from 'cheerio';
import URLInfo from '../models/entities/URLInfo';
import { URL } from 'url';
 
const formUrl = (domainUrl:string, src:string) => {
    if (src.indexOf('http://') < 0 && src.indexOf('https://') < 0) {
        const url = new URL(domainUrl);
        const baseUrl = `${url.protocol}//${url.host}` 
        src = `${baseUrl}/${src}`;
    }
    return src;
}

export const fetchUrlData = async (url:string) => {

        let urlList:URLInfo[] = [];
        const { data:html } = await axios.get(url);
        const $ = cheerio.load(html);

        let imgs = [ 
            ...new Set( 
                $('img') // Select pagination links 
                    .map((_, a) => $(a).attr('src')) // Extract the href (url) from each link 
                    .toArray() // Convert cheerio object to array 
            ), 
        ]
        imgs = imgs.map(el => formUrl(url, el));

        let videos = [ 
            ...new Set( 
                $('video source') // Select pagination links 
                    .map((_, a) => $(a).attr('src')) // Extract the href (url) from each link 
                    .toArray() // Convert cheerio object to array 
            ), 
        ]
        videos = videos.map(el => formUrl(url, el));



        imgs.forEach(img => {
            urlList.push({
                url,
                subUrl:img,
                type: 'image'
            });
        });


        videos.forEach(vid => {
            urlList.push({
                url,
                subUrl:vid,
                type: 'video'
            });
        });
        
        
        return urlList;
}