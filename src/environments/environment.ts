// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'fernandoluque-tpclinica',
    appId: '1:954698860814:web:4ca32070cd5de04835ef5f',
    storageBucket: 'fernandoluque-tpclinica.appspot.com',
    apiKey: 'AIzaSyCp7v70H-4TfxNF1WJstxfdjHKxuhU4Tfo',
    authDomain: 'fernandoluque-tpclinica.firebaseapp.com',
    messagingSenderId: '954698860814',
  },
  production: false,
  recaptcha:{
    siteKey: '6LdU41ogAAAAAEXYf-EqwtQTgtQdd2IGWPu9qp2B'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
