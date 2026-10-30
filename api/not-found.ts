type VercelReq = { query?: { path?: string | string[] } };
type VercelRes = {
  setHeader: (k: string, v: string) => void;
  status: (code: number) => { send: (body: string) => void };
};

export default function handler(req: VercelReq, res: VercelRes) {
  const raw = req.query?.path;
  const path = Array.isArray(raw) ? raw.join('/') : (raw || '');
  const markdown = `# 404 — Page not found

The requested path \`/${path}\` does not exist on cemaltun.ch.

Cem Altun's official website: https://www.cemaltun.ch
Sitemap: https://www.cemaltun.ch/sitemap.xml
llms.txt: https://www.cemaltun.ch/llms.txt
`;

  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Vary', 'Accept');
  res.status(404).send(markdown);
}
