export const config = { runtime: 'edge' };

const ORIGIN = 'https://translate.api.tokisaki.top';

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const target = `${ORIGIN}${url.pathname}${url.search}`;

  const headers = new Headers(req.headers);
  headers.delete('host'); // 让目标域自行设置 host

  const originResp = await fetch(target, {
    method: req.method,
    headers,
    body: req.body,
    redirect: 'manual',
  });

  const respHeaders = new Headers(originResp.headers);
  return new Response(originResp.body, {
    status: originResp.status,
    statusText: originResp.statusText,
    headers: respHeaders,
  });
}