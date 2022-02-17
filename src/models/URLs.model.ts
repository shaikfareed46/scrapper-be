import Sequelize from 'sequelize';
import config from '../config';
const { sequelizeConnection: sequelize } = config;

let URLsModel;
try{
  URLsModel = sequelize.define('url', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: Sequelize.STRING,
    },
    subUrl: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.ENUM('image', 'video'),
    },
  }, {
		initialAutoIncrement: '1000'
	});
} catch (e) {
  console.error(e);
}


export default URLsModel;
