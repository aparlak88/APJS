FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY tsconfig.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY ./src ./src

# Compile TS
RUN npx tsc

# Bundle app source
COPY ./dist .

EXPOSE 3000
CMD [ "node", "./app.js" ]