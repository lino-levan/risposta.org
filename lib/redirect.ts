/** Construct a redirect response */
export function redirect(location: string): Response {
  return new Response(null, {
    headers: {
      location,
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302
    status: 302,
  });
}
