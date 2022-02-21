FROM node:10.16.3-alpine
# RUN npm install node-rdkafka@2.7.1-2

LABEL authors="Shaik Fareed"

RUN mkdir /app
WORKDIR /app

COPY ["package.json", "tsconfig.json", "debug.sh", "yarn.lock", "./"]

EXPOSE  80

CMD ["sh", "debug.sh"]
