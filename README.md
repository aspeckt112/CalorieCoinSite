# Calorie Coin

Calorie Coin is a small, host-agnostic static website. It uses directly served
HTML, CSS, images and a little browser-side JavaScript; there is no build step
or package installation.

## Run locally

From this directory, start a local static server:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>. The site reads `config.json` to decide
whether to show the App Store links, so use an HTTP server rather than opening
the HTML file directly.

## Pages and navigation

- `index.html` contains the product sections, a flat list of section links, and
  the support contact at `#support`.
- `privacy.html` is the standalone privacy policy and links back to the index.

The privacy policy uses host-neutral language for website access logs. Before
deployment, review it against the privacy and logging practices of the selected
static hosting provider.

## App Store links

Set `appStoreUrl` in `config.json` to the app’s HTTPS App Store URL to reveal
the download links. Leave it empty to keep them hidden. The URL is validated in
the browser and must use the `apps.apple.com` hostname.

## Static hosting

Upload the files and directories as they are; do not run a build. Relative asset
and page links allow the site to be served from a domain root or a project
subpath, such as GitHub Pages.
