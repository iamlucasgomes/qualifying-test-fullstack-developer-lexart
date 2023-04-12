FROM node:16.14-alpine
WORKDIR /app-backend
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 3001
ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]