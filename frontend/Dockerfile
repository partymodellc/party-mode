FROM nginx:1.25.3

# install node
RUN apt update && apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs

# setup nginx configuration
RUN echo 'server {\n\
  listen 80;\n\
  server_name $host;\n\
\n\
  location / {\n\
    root /app/dist;\n\
    index index.html;\n\
  }\n\
}'\
> /etc/nginx/conf.d/default.conf

# copy over application
RUN mkdir /app
WORKDIR /app
COPY . .

# install dependencies
ENV NODE_ENV=production
RUN npm install

# build application
RUN npm run build