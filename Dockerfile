# Fetching the latest node image on alpine linux
FROM node:alpine AS development

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /react-app
RUN yarn config set strict-ssl false

# Installing dependencies
COPY ./package.json /react-app
RUN yarn install

# Copying all the files in our project
COPY . .

# Starting our application
CMD npm start

#docker build --rm -f Dockerfile -t frontend:latest .
#docker run -p 3000:3000  frontend -d