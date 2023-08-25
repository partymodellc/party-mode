FROM ubuntu:22.04

# install node
RUN apt update && apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs

# copy over application
RUN mkdir /app
WORKDIR /app
COPY . .

# install dependencies
ENV NODE_ENV=production
RUN npm install

# run application
ENTRYPOINT [ "node", "index.js" ]
#CMD ["tail", "-f", "/dev/null"]