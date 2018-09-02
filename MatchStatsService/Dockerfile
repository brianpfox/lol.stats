FROM node:alpine as build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json package.json
RUN npm install

# Copy the current directory contents into the container at /app
COPY config config
COPY services services
COPY index.js index.js
COPY protos protos

# Create new stage without package.json
FROM build as final

WORKDIR /app
COPY config config
COPY services services
COPY index.js index.js

# Set initial environment variables
ENV NODE_ENV="development"
ENV PORT="3010"
ENV LOG_LEVEL="silly"
ENV RIOT_API_URL="https://na1.api.riotgames.com"
ENV PROTO_PATH="/protos"
# Required to be set at runtime
ENV RIOT_API_KEY=""

EXPOSE 3010

CMD node index