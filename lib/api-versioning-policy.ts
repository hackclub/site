export const API_VERSIONING_POLICY = `# Hack Club API versioning and deprecation policy

Last updated: August 31, 2026

This policy applies to Hack Club's documented public APIs. Internal endpoints that are not present in the public OpenAPI document are unsupported and are not covered by this policy.

## Current stable version

The Events API at \`/api/v1/events\` is the current stable public API. The major version is part of the URL. The OpenAPI document's \`info.version\` identifies the release of the API description; it does not replace the major version in the URL.

## Changes within a major version

We may make backward-compatible changes within \`v1\`, including adding endpoints, optional request parameters, optional response fields, and documentation. Existing fields will keep their documented meaning and type for the lifetime of the major version. Clients should ignore response fields they do not recognize.

A change that would require existing clients to change — such as removing or renaming an endpoint or field, changing a field's type or meaning, or making an optional input required — requires a new major version such as \`/api/v2\`.

Bug fixes that bring behavior back into line with the published OpenAPI document are not considered breaking changes.

## Deprecation and removal

Hack Club will normally give at least 90 days' notice before removing a documented endpoint or major API version. Longer migrations may receive more notice. We may use a shorter period only when needed to address an urgent security, privacy, legal, or severe reliability issue.

A deprecated response will include the RFC 9745 \`Deprecation\` header. When a replacement exists, its URL will be advertised with a \`Link\` header using \`rel="successor-version"\`. Once a removal date is decided, responses will also include the RFC 8594 \`Sunset\` header. The \`Link\` header will point back to this policy with \`rel="deprecation"\`.

No documented v1 endpoint is currently deprecated or scheduled for removal. Active endpoints therefore do not send \`Deprecation\` or \`Sunset\` headers.

## Resources

- API reference: https://hackclub.com/api/v1/docs
- OpenAPI document: https://hackclub.com/api/v1/openapi.json
- Source and issue tracker: https://github.com/hackclub/site
- Contact: echo@hackclub.com
`;
