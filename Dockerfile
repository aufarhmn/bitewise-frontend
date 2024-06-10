FROM node:18-alpine

ENV NEXT_PUBLIC_AI_URL="http://52.184.151.18:5200"
ENV NEXT_PUBLIC_BACKEND_URL="http://52.184.151.18:5100"
ENV PORT=3100

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE $PORT

CMD ["npm", "run", "build"] && ["npm", "run", "start"]
