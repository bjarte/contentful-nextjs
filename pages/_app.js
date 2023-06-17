import '../styles/index.css'
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';

const MyApp = ({ Component, pageProps }) => (
  <ContentfulLivePreviewProvider
    locale="en-US"
  >
    <Component {...pageProps} />
  </ContentfulLivePreviewProvider>
)

export default MyApp
