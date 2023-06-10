import '../styles/index.css'
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';

function App({ Component, pageProps }) {
  return (
    <ContentfulLivePreviewProvider locale="en-US">
      <Component {...pageProps} />
    </ContentfulLivePreviewProvider>
  )
}

export default App
