FROM node
WORKDIR /app
RUN npm install -g pm2
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
