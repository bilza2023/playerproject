FROM node:18-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json ./
RUN npm install 
COPY . ./
RUN npm run build 
EXPOSE 4000 
CMD ["node", "./build/index.js"]