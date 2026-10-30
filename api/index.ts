export const config = { runtime: 'edge' };

const MARKDOWN = `# Cem Altun — Composer & Sound Designer (Zürich)

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
- About: https://www.cemaltun.ch/about
- Contact: https://www.cemaltun.ch/contact
`;

export default async function handler(request: Request) {
  const accept = request.headers.get('accept') || '';
  if (accept.includes('text/markdown')) {
    return new Response(MARKDOWN, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Vary': 'Accept',
      },
    });
  }

  // Serve the static HTML shell
  const url = new URL('/index.html', request.url);
  const res = await fetch(url.toString());
  const html = await res.text();
  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Vary': 'Accept',
    },
  });
}
