FROM node:14

# Create app directory
WORKDIR /usr/src/app

RUN npm install express serve-index --save

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "app.js" ]