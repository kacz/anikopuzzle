FROM node:14

# Create app directory
WORKDIR /usr/src/app

RUN npm install express serve-index --save

# Bundle app source
COPY . .

# add users for the team members
RUN adduser -u 200 krisztian \
    && adduser -u 201 petr \
    && adduser -u 202 milan \
    && adduser -u 203 atanu \
    && adduser -u 204 aniko \
    && adduser -u 205 martin \
    && adduser -u 206 dinesh \
    && adduser -u 207 gerhard \
    && adduser -u 208 tomas \
    && adduser -u 209 bhushan \
    && adduser -u 210 ganesh \
    && adduser -u 211 vishal \
    && adduser -u 212 david \
    && adduser -u 213 matus

EXPOSE 8080
CMD [ "node", "app.js" ]