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
