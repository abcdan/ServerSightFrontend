# Serversight
An server monitoring/documentation tool. This is the front-end part there are 2 other repositories that are required with this.

- https://github.com/lukasvdberk/ServerSightAPI
- https://github.com/lukasvdberk/ServerSightPostScript

## Installation
Clone the project and install

```bash
npm i
```
Then create a config.ts file in src/ with the endpoints to the API.
```ts
export const BASE_MEDIA_URL = 'https://localhost:5001/assets/'
export const BASE_API_URL = 'https://localhost:5001/api/'
```

Run a development server
```bash
npm run dev
```
