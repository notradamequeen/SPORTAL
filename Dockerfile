# In your Dockerfile.
FROM node:8.9.0
# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

COPY . .

RUN npm install

RUN npm run build --production

RUN npm install -g serve

CMD serve -s dist

EXPOSE 5000
