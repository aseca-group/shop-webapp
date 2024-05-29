# Stage 1: Build the application
FROM node:18-alpine AS builder

COPY . .
WORKDIR /app
RUN npm install
#RUN npm install
# Expose the application's port
EXPOSE 3000

# Command to run the application
CMD ["npm", "run","start"]