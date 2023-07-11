import { CMS_NAME, CMS_URL } from '../lib/constants'

export default function Intro() {
  return (
    <section>
      <h2>
        A statically generated blog example using <a href="https://nextjs.org/">Next.js</a> and <a href={CMS_URL}>{CMS_NAME}</a>.
      </h2>
    </section>
  )
}
