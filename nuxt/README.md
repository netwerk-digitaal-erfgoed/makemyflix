# Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the front-end application for production:

```bash
npm run generate
```

Locally preview production build:

```bash
npm run start
```

# Custom config

A build must have a config folder to load correctly.
The config folder should contain:

- branding.json
- queries.json
- Any support files

## Branding.json

The json file contains information about the brand for the application, an example:

```json
{
  "name": "Rijksmuseum",
  "logo": "/config/logo-rijksmuseum.svg",
  "intro": {
    "title": "RijksFlix, aan de slag met de meesterwerken",
    "description": "Het Rijksmuseum is het museum van Nederland. We vertellen het verhaal van 800 jaar Nederlandse geschiedenis vanaf 1200 tot nu. Daarnaast organiseren we meerdere tentoonstellingen per jaar uit eigen collectie en met (inter)nationale bruiklenen.",
    "footer": "BEZOEKERSINFORMATIE Elke dag van 9-17 uur Museumstraat 1, Amsterdam"
  }
}
```

There are some limitations.

- Logo has a height restriction of 60px;
- Intro - title, description or footer are all optional
- Intro - all values are plain text
- Intro - title is always 1 line and cuts off after certain point, some safe sizes are:
  - width 1024px - 30 characters
  - width 1280px - 36 characters
  - width 1600px - 45 characters
- Intro - max length of description is 300

## Queries.json

The json file contains the baseUrl and query setup needed to load in the data.
