import Validator from 'fastest-validator';
import { ValidationError as CustomError } from '../../exceptions/ValidationError';
import { IURLRequest } from '../../models/requests/IURLRequest';

const urlSchema = {
    urls: { type: "array", items: "url" },
}
const v = new Validator();

const urlChecker = v.compile(urlSchema);


export const validateUrl = (urls: IURLRequest) => {
    const isValid = urlChecker(urls);
    if(isValid === true){
        return isValid
    }
    throw new CustomError(isValid);
}