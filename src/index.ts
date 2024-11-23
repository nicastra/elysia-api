import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";

import { note } from "./note";
import { user } from "./user";

const app = new Elysia()
  .use(
    cors({
      origin: /.*\.nicastra\.my.id$/,
    })
  )
  .use(swagger())
  .onError(({ error, code }) => {
    if (code === "NOT_FOUND") return;

    console.log(error);
  })
  .use(user)
  .use(note)
  .listen(process.env.PORT ?? 3020);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
