const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://192.168.0.105:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://192.168.0.105:10676';

const PROXY_CONFIG = [
  {
    context: [
      "/hub/match-management",
      "/weatherforecast",
      "/signin",
      "/signout",
      "/link-identity",
      "/api",
      "/api/match"
   ],
    target: target,
    secure: false,
    ws: true,
    headers: {
      Connection: 'Keep-Alive'
    }
  }
]

module.exports = PROXY_CONFIG;
