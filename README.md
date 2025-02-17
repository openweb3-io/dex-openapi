# dex-openapi


## Install
```bash
yarn add @openweb3-io/dex-aggregator
```

## Usage
### Fetch AccessToken(Server)
```
const tokenUrl = `https://dex.asia.auth.openweb3.io/oauth/token`;

const response = await axios.post(tokenUrl, new URLSearchParams({
  grant_type: 'client_credentials',
  client_id: 'your client id',
  client_secret: 'your client secret',
  audience: audience,
}));

return response.data.access_token;
```


### Client
```typescript

const client = new DexClient(accessToken)
```