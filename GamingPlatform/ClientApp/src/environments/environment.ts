// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  gameAPI: 'http://localhost:3000/api/games/',
  authAPI: 'http://localhost:3000/api/auth/',
  blogAPI: 'http://localhost:3000/api/blogs/',
  orderAPI: 'http://localhost:3000/api/orders/',
  matchUrl: 'http://test.com',
  jwtToken: 'jwt-token',


  baseUrl: 'https://192.168.0.105:7044',
  matchHub: 'https://192.168.0.105:7044/hub/match-management'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
