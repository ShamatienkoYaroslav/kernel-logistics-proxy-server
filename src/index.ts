import { Server, IncomingMessage, ServerResponse } from "http";
import * as fastify from "fastify";

import proxys from "./proxys";

const PORT = Number(process.env.PORT || 8000);
console.log("process.env.PORT", process.env.PORT);

const server: fastify.FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({ logger: true });

server.register(proxys);

server.listen({ port: PORT }, (error) => {
  if (error) {
    server.log.error(error);
    process.exit(1);
  }
});

process.on("uncaughtException", (error) => {
  server.log.error(error);
});
process.on("unhandledRejection", (error) => {
  server.log.error(error);
});
