// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAc6-jpMbYu0GynObnncbLCEEv3oN_Dvx8",
    authDomain: "toto-company.firebaseapp.com",
    databaseURL: "https://toto-company.firebaseio.com",
    projectId: "toto-company",
    storageBucket: "toto-company.appspot.com",
    messagingSenderId: "553262224594",
    appId: "1:553262224594:web:95c65bd6ab5cc7f4a5090b",
    measurementId: "G-VYSN7PCTZK"
},
SocketIoConfig: {
  url: 'https://poised-elf-271018.appspot.com/', options: {}
},
apiUrl: 'https://poised-elf-271018.appspot.com/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
