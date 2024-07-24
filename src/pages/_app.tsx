// pages/_app.tsx
import 'leaflet/dist/leaflet.css';
import '../styles/globals.css'; // Adjust according to your project
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
