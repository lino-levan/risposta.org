import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

// deno-lint-ignore require-await
export default async function App(req: Request, ctx: FreshContext) {
  const cookies = getCookies(req.headers);
  return (
    <html data-theme={cookies.theme ?? "cupcake"}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Risposta</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="/gfm.css" />
      </head>
      <body class="flex flex-col">
        <ctx.Component />
      </body>
    </html>
  );
}
