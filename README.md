# Service
URL Scraper service

## Service Architecture:
Node.js backend with MSSQL

## Service Features:
1.  Scrape images and videos link
2.  Save the links into db
3.  Provide a pagination feature for viewing the links

## Build Steps:
* **swarm mode** - development: `./deploy dev`
* **swarm mode** - production-like: `./deploy`

## Run Tests:
./test.sh

## Healthcheck:

1.  Endpoint: `/healthcheck`
2.  Expected HTTP Response Code: **200**

## SmokeTest:
1.  Endpoint: `/healthcheck`
2.  Expected HTTP Response Code: **200**

## Service Logging:

1.  Log Levels supported: **trace, debug, info, warn, error, fatal**
2.  Default Loglevel: **debug**
3.  Log Formats supported: **Log4js**

## Environment Variables:

**(Required)**
1. `NODE_ENV=production` 
2. `LOGGER_CONFIG={"disableClustering":true,"appenders":{"out":{"type":"stdout","layout":{"type":"pattern","pattern":"%[ [%d] [%p] %] %c - %x{correlationId} - %m"}}},"categories":{"default":{"appenders":["out"],"level":"trace"}}}`
3. `SQL_DB_USERNAME=root`
4. `SQL_DB_PASSWORD=dbPassword`
5. `SQL_DB_HOST=sqldb`
6. `SQL_DB_NAME=doh`
7. `BASIC_AUTH_USERNAME=USERNAME`
8. `SQL_DB_LOCAL_PORT=3307`
9. `SQL_DB_DOCKER_PORT=3306`
8. `BASIC_AUTH_PASSWORD=PASSWORD`

**(Optional)**
1. `SQL_DB_PORT=1433`
2. `DB_CONNECTION_TIMEOUT=15000`
3. `DB_REQUEST_TIMEOUT=15000`

## Service Dependencies:
### Upstream
1. Client facing ...

### Downstream
1. MSSQL

## Ports Used:
* **80**

## API
[Postman API Docs]()
