FROM node:18-alpine

WORKDIR /app

COPY . .

RUN yarn install \
&& yarn build

EXPOSE 5000

CMD ["yarn", "start"]
