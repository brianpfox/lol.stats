FROM node:alpine as build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json package.json
RUN npm install

# Copy the current directory contents into the container at /app
COPY config config
COPY controllers controllers
COPY protos protos
COPY routes routes
COPY services services
COPY ui ui
COPY index.js index.js

# Create new stage without package.json
FROM build as final

WORKDIR /app
COPY config config
COPY controllers controllers
COPY protos protos
COPY routes routes
COPY services services
COPY ui ui
COPY index.js index.js

# Set initial environment variables
ENV NODE_ENV="development"
ENV PORT="3001"
ENV LOG_LEVEL="silly"
ENV SAMPLE_SERVICE_URL="localhost"
ENV SAMPLE_SERVICE_PORT="3010"
ENV PROTO_PATH="/../protos"
ENV UI_INDEX_PATH="ui/index.html"
ENV UI_STATIC_PATH="ui/static"

EXPOSE 3001

CMD node index