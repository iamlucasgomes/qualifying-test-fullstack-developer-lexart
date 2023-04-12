FROM node:16.14-alpine
WORKDIR /app-frontend
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 3000
ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]