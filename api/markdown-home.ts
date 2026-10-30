type VercelReq = { query?: { path?: string | string[] } };
type VercelRes = {
  setHeader: (k: string, v: string) => void;
  status: (code: number) => { send: (body: string) => void };
};

export default function handler(req: VercelReq, res: VercelRes) {
  const markdown = `# Cem Altun — Composer & Sound Designer (Zürich)

Cem Altun is a composer, arranger, and sound designer based in Zürich, Switzerland. He specializes in film scores, video game music, theater music, orchestration, and cinematic piano compositions.

## About
Graduate of the Zurich University of the Arts (ZHdK) in Composition for Film, Theatre, and Media (CAS). Works across film, theater, video games, and digital media.

## Services
- Film scoring
- Video game music / interactive sound design
- Theater music
- Orchestration
- Cinematic piano compositions

## Links
- Website: https://www.cemaltun.ch
- Instagram: https://www.instagram.com/cem_altun/
- Spotify: https://open.spotify.com/intl-tr/artist/11iL36m7FZC8toXhnY3Qzj
- IMDb: https://www.imdb.com/name/nm10851893/
- LinkedIn: https://www.linkedin.com/in/cem-altun-31037515b/

## Pages
- Home: https://www.cemaltun.ch/
- Privacy: https://www.cemaltun.ch/privacy

## Contact
For commissions and collaborations, reach out via the contact section on the website.
`;

  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Vary', 'Accept');
  res.status(200).send(markdown);
}
