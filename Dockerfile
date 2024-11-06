FROM node:lts-alpine

# Create app directory

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm","run", "dev" ]

ENTRYPOINT ["npm", "run", "start" ]