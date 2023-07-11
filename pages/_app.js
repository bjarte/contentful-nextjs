import '../styles/index.css'
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';

// ContentfulLivePreview.init({ 
//   locale: 'en-US', // This is required and allows you to set the locale once and have it reused throughout the preview
//   enableInspectorMode: true, // This allows you to toggle the inspector mode which is on by default
//   enableLiveUpdates: true, // This allows you to toggle the live updates which is on by default
//   debugMode: true, // This allows you to toggle the debug mode which is off by default
// });

const MyApp = ({ Component, pageProps }) => (
  <ContentfulLivePreviewProvider locale="en-US">
    <Component {...pageProps} />
  </ContentfulLivePreviewProvider>
)

export default MyApp
