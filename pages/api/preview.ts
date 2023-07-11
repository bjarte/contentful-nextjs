import { getPreviewPostBySlug } from '../../lib/api'
import { COOKIE_NAME_PRERENDER_BYPASS } from 'next/dist/server/api-utils';

export default async function preview(req, res) {
  const { secret, slug } = req.query

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !slug) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const post = await getPreviewPostBySlug(slug)

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  // Enable Draft Mode by setting the cookie
  res.setDraftMode({ enable: true })

  // Override cookie header for draft mode for usage in live-preview

console.log("COOKIE_NAME_PRERENDER_BYPASS: " + COOKIE_NAME_PRERENDER_BYPASS)

  const headers = res.getHeader('Set-Cookie');
  if (Array.isArray(headers)) {
    res.setHeader(
      'Set-Cookie',
      headers.map((cookie: string) => {
        if (cookie.includes(COOKIE_NAME_PRERENDER_BYPASS)) {
          return cookie.replace('SameSite=Lax', 'SameSite=None; Secure');
        }
        return cookie;
      }),
    );
  }

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  // res.writeHead(307, { Location: `/posts/${post.slug}` })
  const url = `/posts/${post.slug}`
  res.setHeader('Content-Type', 'text/html')
  res.write(
    `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
    <script>window.location.href = '${url}'</script>
    </head>
    </html>`
  )
  res.end()
}
