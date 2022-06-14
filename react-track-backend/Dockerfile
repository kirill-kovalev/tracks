FROM node:17-alpine
WORKDIR /app
COPY . /app/

RUN npm install
EXPOSE 5000

VOLUME /app/tracks

CMD ["node", "./bin/www"]