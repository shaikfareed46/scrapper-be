FROM node:12-alpine AS BUILD_IMAGE

LABEL authors="Shaik Fareed"

RUN mkdir /app
WORKDIR /app

COPY ["./package.json", "tsconfig.json", "yarn.lock", "./"]

COPY src ./src
RUN yarn run build

# run node prune
RUN /usr/local/bin/node-prune


FROM node:10.16.3-alpine 
WORKDIR /app
# copy from build image
COPY --from=BUILD_IMAGE /app/dist ./dist
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY src/assets /app/dist/assets

EXPOSE  80

CMD ["node", "dist"]
