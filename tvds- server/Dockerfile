FROM node:16-alpine as builder

RUN mkdir /app
WORKDIR /app

RUN npm install -g grpc-tools protoc-gen-ts
COPY package*.json tsconfig.json ./
RUN npm ci

COPY webpack.config.js gen.sh ./
COPY prisma ./prisma
COPY protos ./protos
COPY src ./src

RUN npm run build
RUN npm prune --production
RUN rm -rf src/ protos/ gen* webpack.config.js tsconfig.json

FROM node:16-alpine as production
WORKDIR /app

COPY --from=builder /app .

CMD ["node", "."]