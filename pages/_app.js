import '../styles/index.css'
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';

function MyApp({ Component, pageProps }) {
  <ContentfulLivePreviewProvider locale="en-US">
    return <Component {...pageProps} />
  </ContentfulLivePreviewProvider>
}

export default MyApp
