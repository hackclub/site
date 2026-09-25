/**
 * To bump Scalar, change the version in the src *and* regenerate the hash —
 * SRI is what protects us from a compromised CDN, and a stale hash blocks the
 * script entirely:
 *
 *   curl -s https://cdn.jsdelivr.net/npm/@scalar/api-reference@X.Y.Z/dist/browser/standalone.min.js \
 *     | openssl dgst -sha384 -binary | openssl base64 -A
 */

const SCALAR_VERSION = "1.67.0";
const SCALAR_SRI = "sha384-zH522fC6a57bnP3yLzTekKbq61WR1WnYu4dxusbB48q1eska2wE6/qmqHAHEkv+H";

export const SCALAR_SRC = `https://cdn.jsdelivr.net/npm/@scalar/api-reference@${SCALAR_VERSION}/dist/browser/standalone.min.js`;

export const SCALAR_CUSTOM_CSS = `
@font-face {
  font-family: 'Phantom Sans';
  src: url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Phantom Sans';
  src: url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

:root {
  --scalar-font: 'Phantom Sans', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --scalar-font-code: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  --scalar-radius: 8px;
  --scalar-radius-lg: 12px;
  --scalar-radius-xl: 16px;
  --scalar-radius-2xl: 20px;
  --scalar-radius-3xl: 24px;
  --scalar-radius-full: 9999px;
  --scalar-color-red: #ec3750;
  --scalar-color-orange: #ff8c37;
  --scalar-color-yellow: #f1c40f;
  --scalar-color-green: #33d6a6;
  --scalar-color-blue: #338eda;
  --scalar-color-purple: #a633d6;
  --scalar-button-1: #ec3750;
  --scalar-button-1-hover: #d62f46;
  --scalar-button-1-color: #ffffff;
  --scalar-link-color: #ec3750;
  --scalar-link-color-hover: #d62f46;
  --scalar-link-color-visited: #a633d6;
  --scalar-sidebar-font-weight-active: 700;
}

.light-mode {
  --scalar-color-1: #17171d;
  --scalar-color-2: rgba(23, 23, 29, 0.72);
  --scalar-color-3: #8492a6;
  --scalar-color-accent: #ec3750;
  --scalar-background-1: #ffffff;
  --scalar-background-2: #f9fafc;
  --scalar-background-3: #fff6eb;
  --scalar-background-4: #f1f2f5;
  --scalar-background-accent: rgba(236, 55, 80, 0.1);
  --scalar-border-color: rgba(23, 23, 29, 0.1);
  --scalar-sidebar-background-1: #fff6eb;
  --scalar-sidebar-color-active: #ec3750;
  --scalar-sidebar-item-hover-background: rgba(236, 55, 80, 0.08);
  --scalar-sidebar-item-active-background: rgba(236, 55, 80, 0.12);
  --scalar-sidebar-search-background: #ffffff;
  --scalar-sidebar-search-border-color: rgba(23, 23, 29, 0.12);
}

.dark-mode {
  --scalar-color-1: #fff6eb;
  --scalar-color-2: rgba(255, 246, 235, 0.72);
  --scalar-color-3: #8492a6;
  --scalar-color-accent: #ff8c37;
  --scalar-background-1: #17171d;
  --scalar-background-2: #1f1f27;
  --scalar-background-3: #2a2a33;
  --scalar-background-4: #341f24;
  --scalar-background-accent: rgba(236, 55, 80, 0.16);
  --scalar-border-color: rgba(255, 246, 235, 0.1);
  --scalar-button-1: #ec3750;
  --scalar-button-1-hover: #ff5369;
  --scalar-link-color: #ff8c37;
  --scalar-link-color-hover: #ffad70;
  --scalar-link-color-visited: #d98cf7;
  --scalar-sidebar-background-1: #141419;
  --scalar-sidebar-color-active: #ff8c37;
  --scalar-sidebar-item-hover-background: rgba(255, 140, 55, 0.1);
  --scalar-sidebar-item-active-background: rgba(236, 55, 80, 0.16);
  --scalar-sidebar-search-background: #1f1f27;
  --scalar-sidebar-search-border-color: rgba(255, 246, 235, 0.12);
}

.sidebar {
  --scalar-sidebar-border-color: var(--scalar-border-color);
  --scalar-sidebar-color-1: var(--scalar-color-1);
  --scalar-sidebar-color-2: var(--scalar-color-2);
  --scalar-sidebar-search-color: var(--scalar-color-2);
}

::selection {
  color: #ffffff;
  background: #ec3750;
}

:focus-visible {
  outline-color: #ff8c37;
}
`;

export const SCALAR_DOCS_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hack Club Events API</title>
    <meta name="description" content="Reference for the Hack Club Events API." />
    <meta name="robots" content="noindex" />
    <link rel="icon" href="/favicon.png" />
    <link rel="alternate" type="application/json" href="/api/v1/openapi.json" title="OpenAPI 3.2 (JSON)" />
    <link rel="alternate" type="application/yaml" href="/api/v1/openapi.yaml" title="OpenAPI 3.2 (YAML)" />
    <link rel="alternate" type="application/rss+xml" href="/api/v1/events/rss" title="Hack Club events" />
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
    <link rel="preconnect" href="https://assets.hackclub.com" crossorigin />
    <style>
      body { margin: 0; background: #17171d; color: #f5f5f5;
             font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; }
      .fallback { max-width: 44rem; margin: 4rem auto; padding: 0 1.5rem; line-height: 1.6; }
      .fallback a { color: #ec3750; }
      .fallback[hidden] { display: none; }
    </style>
  </head>
  <body>
    <div id="app"></div>

    <div class="fallback" id="scalar-fallback" hidden>
      <h1>Hack Club Events API</h1>
      <p>The interactive reference could not load. The API itself is unaffected:</p>
      <ul>
        <li><a href="/api/v1/events">/api/v1/events</a> — every event</li>
        <li><a href="/api/v1/events/rss">/api/v1/events/rss</a> — newly announced events, as RSS</li>
        <li><a href="/api/v1/openapi.json">/api/v1/openapi.json</a> — OpenAPI 3.2 description</li>
        <li><a href="/api/v1/openapi.yaml">/api/v1/openapi.yaml</a> — the same document as YAML</li>
      </ul>
    </div>

    <noscript>
      <style>#scalar-fallback { display: block !important; }</style>
    </noscript>

    <script
      src="${SCALAR_SRC}"
      integrity="${SCALAR_SRI}"
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
      onerror="document.getElementById('scalar-fallback').hidden = false"
    ></script>
    <script>
      (function () {
        function fallback() { document.getElementById('scalar-fallback').hidden = false; }
        if (!window.Scalar) { fallback(); return; }
        try {
          Scalar.createApiReference('#app', {
            url: '/api/v1/openapi.json',
            theme: 'none',
            customCss: ${JSON.stringify(SCALAR_CUSTOM_CSS)},
            withDefaultFonts: false,
            darkMode: true,
            layout: 'modern',
            defaultOpenAllTags: true,
            documentDownloadType: 'both'
          });
        } catch (e) { fallback(); }
        setTimeout(function () {
          if (!document.querySelector('#app').firstChild) fallback();
        }, 5000);
      })();
    </script>
  </body>
</html>
`;
