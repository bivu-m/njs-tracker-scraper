FROM mcr.microsoft.com/playwright:v1.42.0-jammy

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]