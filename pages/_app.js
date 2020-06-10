import React from 'react';
import Home from './';

import 'nes.css/css/nes.min.css';

function App({ Component, pageProps }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
        <script data-ad-client="ca-pub-3608055168689288" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      </head>
      <body>
      <Home />
        <style jsx global>{`
          * {
            font-family: 'Press Start 2P', cursive;
          }
          html, body {
            background-color: #252525;
          }
        `}</style>
      </body>
    </html>
  );
}

export default App;
