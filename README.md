<p align="center"><img width="192" alt="Hack Club logo" src="https://assets.hackclub.com/flag-standalone.svg"></p>
<h1 align="center">Hack Club's Site (v4)</h1>

This codebase powers the Hack Club website, which is built with [Next.js](https://nextjs.org/). You can view it live at [hackclub.com](https://hackclub.com/)

## Development

1. Clone the repository

```sh
git clone --depth 1 https://github.com/hackclub/site.git
```

> [!NOTE]
> --depth 1 only gets the latest commit, if you need the full history (unlikely, ~562M), remove the --depth.

2. Install the dependencies

```sh
bun install
```

3. Then, start the development server:

```sh
bun dev
```

4. Run the tests with:

```sh
bun test
```

## For agents

The site publishes a machine-readable surface alongside the HTML:

| URL | What it is |
| --- | --- |
| `/llms.txt` | Index of every page, in the [llmstxt.org](https://llmstxt.org) format |
| `/openapi.json`, `/api/openapi.yaml` | OpenAPI 3.1 description of the public read-only JSON endpoints |
| `/sitemap.xml`, `/robots.txt` | Canonical URLs and crawl rules |
| `<page>.md` | Markdown representation of any page (`/index.md` for the homepage) |

Any page also answers `Accept: text/markdown` with Markdown from the same URL

## Credits

Tongyu ([@bucketfish](https://github.com/bucketfish)) made most of the design with help from Rowan ([@3kh0](https://github.com/3kh0)). This is also built with help and feedback from many other Hack Club members! You can join the fun by submitting a pull request!
