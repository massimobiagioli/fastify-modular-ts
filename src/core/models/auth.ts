import {FastifyReply, FastifyRequest} from "fastify";

export type AuthenticateFunction = (
    request: FastifyRequest,
    reply: FastifyReply,
) => Promise<void>