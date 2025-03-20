#connects to base image
FROM node:20-alpine

#install http-server globally
RUN npm install -g http-server

#sets the working directory
WORKDIR /app

#copies the local files into the container
COPY . .

#exposes the port 8080 to use
EXPOSE 8080

#starts the http-server
CMD ["http-server", "-p", "8080"]
