import URLsModel from '../models/URLs.model';

const dbInit = async () => {
  await URLsModel.sync({ force: process.env.NODE_ENV === 'dev' });
};
export default dbInit;
