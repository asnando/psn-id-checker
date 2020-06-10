import Document, { Html, Head, Main, NextScript} from 'next/document';

const ANALYTICS_UA = process.env.ANALYTICS_UA;

const GTAG_SCRIPT_URL = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_UA}`;
const GTAG_SCRIPT = `
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', '${ANALYTICS_UA}');
`;
console.log(GTAG_SCRIPT);

class AppDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <script src={GTAG_SCRIPT_URL} async />
          <script dangerouslySetInnerHTML={{__html: GTAG_SCRIPT }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
