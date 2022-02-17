import loggerFactory from '../utils/logging';
import { Sequelize, Op } from 'sequelize';
const operatorsAliases = {
  $like: Op.like
};

const logger = loggerFactory.getLogger('Config');
interface IConfig {
  port: number;
  sqlDbUsername: string;
  sqlDbPassword: string;
  sqlDbHost: string;
  sqlDbPort: number;
  sqlDbName: string;

  dbConnectionTimeout: number;
  dbRequestTimeout: number;

  basicAuthUsername: string;
  basicAuthPassword: string;
  sequelizeConnection: Sequelize;
}
const config: IConfig = <IConfig>{
  port: 80,
  sqlDbUsername: 'root',
  sqlDbName: 'url',
  sqlDbHost: '0.0.0.0',
  sqlDbPort: 3306,
  sqlDbPassword: '123456',
  dbConnectionTimeout: 15000, // ms 15 sec
  dbRequestTimeout: 15000, // ms 15 sec

  basicAuthUsername: 'admin',
  basicAuthPassword: 'my-strong-password',
};

if (typeof process.env.PORT !== 'undefined') {
  config.port = Number(process.env.PORT);
} else {
  logger.warn(`Missing parameter: PORT! setting default ${config.port}`);
}

if (typeof process.env.SQL_DB_USERNAME !== 'undefined') {
  config.sqlDbUsername = process.env.SQL_DB_USERNAME;
} else {
  logger.warn('Missing parameter: SQL_DB_USERNAME! Exiting...');
  // process.exit(1);
}

if (typeof process.env.SQL_DB_PASSWORD !== 'undefined') {
  config.sqlDbPassword = process.env.SQL_DB_PASSWORD;
} else {
  logger.warn('Missing parameter: SQL_DB_PASSWORD! Exiting...');
  // process.exit(1);
}

if (typeof process.env.SQL_DB_HOST !== 'undefined') {
  config.sqlDbHost = process.env.SQL_DB_HOST;
} else {
  logger.warn('Missing parameter: SQL_DB_HOST! Exiting...');
  // process.exit(1);
}

if (typeof process.env.SQL_DB_PORT !== 'undefined') {
  config.sqlDbPort = Number(process.env.SQL_DB_PORT);
} else {
  logger.warn('Missing parameter: SQL_DB_PORT! Exiting...');
  // process.exit(1);
}

if (typeof process.env.SQL_DB_NAME !== 'undefined') {
  config.sqlDbName = process.env.SQL_DB_NAME;
}

if (typeof process.env.DB_CONNECTION_TIMEOUT !== 'undefined') {
  config.dbConnectionTimeout = Number(process.env.DB_CONNECTION_TIMEOUT);
} else {
  logger.warn(`setting default value [${config.dbConnectionTimeout}] for  DB_CONNECTION_TIMEOUT ...`);
}

if (typeof process.env.DB_REQUEST_TIMEOUT !== 'undefined') {
  config.dbRequestTimeout = Number(process.env.DB_REQUEST_TIMEOUT);
} else {
  logger.warn(`setting default value [${config.dbRequestTimeout}] for  DB_REQUEST_TIMEOUT ...`);
}

// Add Sequelize connection
logger.info('Creating the sql connection');
const sequelizeConnection = new Sequelize(config.sqlDbName, config.sqlDbUsername, config.sqlDbPassword, {
  host: config.sqlDbHost,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  operatorsAliases,
});

logger.info('Config for the app: %o', config);

config.sequelizeConnection = sequelizeConnection;

export default config;
