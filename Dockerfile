FROM node:19
WORKDIR /app
COPY backend /app
RUN npm install
RUN npm build
EXPOSE 3000
CMD ["npm", "start"]