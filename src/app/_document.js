// File: pages/_document.js (new file if using Pages Router)
// If using App Router, this should go into a custom Document component

import { Html, Head, Main, NextScript } from 'next/document';
import fs from 'fs';
import path from 'path';

export default function Document() {
  // Read critical CSS at build time
  let criticalCSS = '';
  try {
    criticalCSS = fs.readFileSync(
      path.join(process.cwd(), 'styles/critical.css'),
      'utf8'
    );
  } catch (e) {
    console.error('Error loading critical CSS:', e);
  }

  return (
    <Html lang="en">
      <Head>
        {/* Inline critical CSS */}
        {criticalCSS && <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />}
        
        {/* Preload fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Optimized font loading */}
        <link
          href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap"
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}