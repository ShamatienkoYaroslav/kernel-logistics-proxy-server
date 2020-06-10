FROM node:12.16-alpine

WORKDIR /app

COPY . .

RUN npm install --no-progress --quiet
RUN npm run build

CMD [ "npm", "start", "--silent" ]
