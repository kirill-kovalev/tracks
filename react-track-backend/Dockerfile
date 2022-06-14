FROM node:17-alpine
WORKDIR /app
COPY . /app/

RUN npm install
EXPOSE 5000
USER node
CMD ["node", "./bin/www"]