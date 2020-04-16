# Hack Club Theme Starter

A sample [Next.js] project for getting started with [MDX], [Theme UI], & [Hack Club Theme].

[next.js]: https://nextjs.org
[mdx]: https://mdxjs.com
[theme ui]: https://theme-ui.com
[hack club theme]: https://github.com/hackclub/theme

## Usage

1. Import this repo to your coding environment of choice. Download it, `git clone`, or use the GitHub import on Glitch/Repl.it.
2. `yarn` to install dependencies.
3. `yarn dev` to start your server.
4. Start adding your own pages & components in their respective directories.

## Configuration

### Theme switcher

We’ve included an example theme switcher component at `components/color-switcher.js`,
which is included on every page through its inclusion in `pages/_app.js`.
Feel free to change it.

### Hack Club fonts

If you’re making a Hack Club HQ project, you’re allowed to use Hack Club’s font,
[Phantom Sans](https://www.futurefonts.xyz/phantom-foundry/phantom-sans).
To load it, simply uncomment the `import '@hackclub/theme/fonts/reg-bold.css'`
line in `_app.js`.

### Custom theme

By default, the raw [Hack Club Theme](https://theme.hackclub.com) will be used.
If you’d like to edit the theme, we recommend making a theme file (perhaps at
`lib/theme.js`) along these lines:

```js
import base from '@hackclub/theme'

const theme = base

// theme.fontSizes = […]
// theme.fonts.heading = ''

export default theme
```

### Running at another port

Super easy: `yarn dev -p 5000`

### Adding meta tags

These template includes [@hackclub/meta](https://github.com/hackclub/theme/tree/master/packages/meta)
for adding meta tags to Hack Club HQ sites. To set default meta tags across all pages,
add the following to `pages/_app.js`:

```js
// import Head from 'next/head'

<Head>
  <Meta
    name="Hack Club" // site name
    title="Hackathons" // page title
    description="List of upcoming high school hackathons" // page description
    image="https://hackathons.hackclub.com/card.png" // large summary card image URL
    color="#ec3750" // theme color
    manifest="/site.webmanifest" // link to site manifest
  />
</Head>
```

If you’re not making a site for HQ, don’t use `@hackclub/meta`, since it adds
Hack Club’s favicons & info. Instead, we recommend making your own component,
perhaps at `components/meta.js`.

<details>

<summary>Example code</summary>

```js
import Head from 'next/head'
import theme from '@hackclub/theme' // or '../lib/theme'

export default ({
  name = 'Your Company',
  title = 'Your Project',
  description = '',
  image = 'https://yourproject.now.sh/card.png',
  url = 'https://yourproject.now.sh/'
}) => (
  <Head>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta name="twitter:title" content={title} />
    <meta name="og:url" content={url} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={name} />
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta name="twitter:description" content={description} />
    <meta property="og:image" content={image} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={image} />
    <meta name="msapplication-TileColor" content={theme.colors.primary} />
    <meta name="theme-color" content={theme.colors.primary} />
  </Head>
)
```

</details>

## Deployment

[![Deploy with ZEIT Now](https://zeit.co/button)](https://zeit.co/import/project?template=https://github.com/hackclub/theme-starter)

We recommend using [ZEIT Now](https://zeit.co) for deployment. It requires no
configuration, is totally free for personal projects, and supports all the features
of Next.js with the best performance. Refer to [their documentation](https://zeit.co/docs#deploy-an-existing-project)
for more details.

If you’re only making a static site (e.g. no [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering)
or [API Routes](https://nextjs.org/docs/api-routes/introduction)), you can also
deploy on [Netlify](https://netlify.com), which is also free. Refer to [their documentation](https://docs.netlify.com/configure-builds/common-configurations/#next-js)
on the necessary configuration.
