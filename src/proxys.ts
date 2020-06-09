import { Server, IncomingMessage, ServerResponse } from "http";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import * as proxy from "fastify-http-proxy";

const preHandler = (
  request: FastifyRequest,
  reply: FastifyReply<ServerResponse>,
  next: () => void
) => {
  const authKey = request.headers["kernel-auth-key"];
  if (authKey !== process.env.AUTH_KEY) {
    reply.send({
      error: {
        code: "INVALID_AUTH_KEY",
        msg: "Invalid authorisation key. Please provide valid key.",
      },
    });
  } else {
    next();
  }
};

export default (
  server: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _opts: Record<string, unknown>,
  next: () => void
): void => {
  server.register(proxy, {
    upstream: "https://maps.googleapis.com",
    prefix: "/maps_google_api",
    http2: false,
    preHandler,
  });

  next();
};
