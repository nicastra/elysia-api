import { Elysia, t } from "elysia";

export const user = new Elysia({ prefix: "/user" })
  .state({
    user: {} as Record<string, string>,
    session: {} as Record<number, string>,
  })
  .put(
    "/sign-up",
    async ({ body: { username, password }, store, error }) => {
      if (store?.user[username])
        return error(400, { success: false, message: "User Alredy Exist" });

      store.user[username] = await Bun.password.hash(password);

      return {
        success: true,
        message: "User Created",
      };
    },
    {
      body: t.Object({
        username: t.String({ minLength: 1 }),
        password: t.String({ minLength: 6 }),
      }),
    }
  );
