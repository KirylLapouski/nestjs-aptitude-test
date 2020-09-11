FROM node:12.18.1

WORKDIR /code

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

RUN npm install

COPY . /code

EXPOSE 5000

CMD ["npm", "run", "start"]
