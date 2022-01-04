# pull the Node.js Docker image
FROM node:16-alpine

# create the directory inside the container
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "start:production"]
