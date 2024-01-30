# Stage 1: Building the application
# Use the official Node.js 20 image as a base image
FROM node:20-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install dependencies in a separate layer to leverage Docker cache
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serving the application using Nginx
# Use nginx as the web server
FROM nginx:alpine

# Copy the built React app from the previous stage to the nginx server
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (default port for HTTP)
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
