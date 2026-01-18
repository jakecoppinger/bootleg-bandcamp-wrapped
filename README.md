Bootleg Bandcamp Wrapped
========================

It's like Spotify wrapped but for Bandcamp instead! Share the albums you bought this year and see how much you paid artists!

This is a fork of Tom MacWright Val Town project. Make sure to read the [README.md](https://www.val.town/x/tmcw/bandcampWrapped/code/README.md) of the original, [read his blog post](https://macwright.com/2024/12/06/bandcamp-wrapped) and try the [original](https://tmcw-bandcampwrapped.web.val.run/).

Note this is very much a weekend project and may has bugs.

# Setup

```bash
nvm use
npm install
npm run dev
```

Note the dev server will hot reload if you edit Typescript, but you will need to reload the server if you update the HTML.

# Building
```bash
npm run build
```

# Testing
```bash
npm run test
```

For a live reload:
```bash
npm run test:watch
```

## How to add a test on other albums

To add a test, copy the HTML from the purchases page, then paste it into a rich text clipboard inspector (eg. https://evercoder.github.io/clipboard-inspector/) to get the HTML from the clipboard. Put the raw HTML into a file and add a test.
