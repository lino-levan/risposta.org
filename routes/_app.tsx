import { type PageProps } from "$fresh/server.ts";
import {pageTheme} from "lib/page_theme.ts"

export default function App({ Component }: PageProps) {
  return (
    <html data-theme={pageTheme}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Risposta</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="flex flex-col">
        <Component />
      </body>
    </html>
  );
}
