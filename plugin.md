# step by step to add plugin in strapi project

1. create strapi app
```
npx create-strapi-app@4.20.4 my-project (or .)
```

2. at root run following command to create plugin
```
npm run strapi generate plugin
```

3. code code from terminal after cli generate plugin completely
```
./config/plugins.js
module.exports = {
  // ...
  "my-plugin": {
    // name of your plugin, kebab-cased
    enabled: true,
    resolve: "./src/plugins/my-plugin", // path to the plugin folder
  },
  // ...
};
```

4. Install dependencies, build the admin panel, and start servers

- Navigate to the folder of the plugin.
If created from a Strapi project using the CLI generator, plugins are located in the src/plugins folder (see project structure).

- Run the following command in the newly-created plugin directory to install plugin dependencies:

```
npm install
```

- Navigate back to the Strapi project root with cd ../../.. and run the following command to build the admin panel and start the server(s):

```
npm run develop

```

5. Servers and hot reloading
Strapi itself is headless . The admin panel is completely separate from the server.

Axios instance
Server
Admin Panel
The server can be started in 2 different ways: you can run the backend server only or start both the server and admin panel servers.

Start only the backend server
To start only the backend server, run the following command:

```
npm run develop
```

This will run the server on localhost:1337 and enable hot reloading only on the back-end server, i.e. it will only auto-reload when changes are made to the server. If you are only doing development in the ./server directory of your plugin, this will be faster.

Start both the backend and admin panel servers
If you are doing development on both the /server and /admin directories of your plugin, run the following command:

```
npm run develop -- --watch-admin
```

This will run the server on localhost:1337 and enable hot reloading on both the back-end and front-end servers, i.e.it will auto-reload when changes are made to the server or the admin panel of Strapi.

6. change plugin/../admin/src/index.js and icons, pages files

```
index.js

import pluginId from "./pluginId.js";
import PluginIcon from "./components/PluginIcon/index.js";
import App from "./pages/App/index.js";

export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Generate Charts Script",
      },
      Component: async () => App,
    });
  },

  bootstrap(app) {
    console.log(`${pluginId} is running`);
  },
};


```

```
/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
const App = () => {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      overflow: 'hidden'
    }}>


      <iframe src="http://localhost:1337/editor.html" style={{
        width: '100%',
        height: '100%',
        border: 'none'
      }}></iframe>
    </div>
  );
};

export default App;
```

```
import React from "react"
export default function PluginIcon() {
    return (
        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.5 2c-.178 0-.356.013-.492.022l-.074.005a1 1 0 0 0-.934.998V11a1 1 0 0 0 1 1h7.975a1 1 0 0 0 .998-.934l.005-.074A7.04 7.04 0 0 0 22 10.5 8.5 8.5 0 0 0 13.5 2Z" />
            <path d="M11 6.025a1 1 0 0 0-1.065-.998 8.5 8.5 0 1 0 9.038 9.039A1 1 0 0 0 17.975 13H11V6.025Z" />
        </svg>

    )
}

```

```
jsconfig.json at root
{
  "compilerOptions": {
    "moduleResolution": "nodenext",
    // "target": "ES2021",
    "checkJs": true,
    "allowJs": true,
    "target": "es6",
    "jsx": "react",
    "module": "NodeNext",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
  },
  "include": [
    "./src/**/*.js",
    "./src/**/*.jsx"
  ]
}

```

# when adding page to public folder of strapi cms
- strapi is very secure so if i want to use any domain or api other than own domain it will restrict so change it by changing config.middleware.js ma Content Security Policy (CSP) 

``` before

module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'dhruv-website-cms.s3.ap-south-1.amazonaws.com',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'dhruv-website-cms.s3.ap-south-1.amazonaws.com',
          ],
          upgradeInsecureRequests: null,

          'default-src': ["'self'"],
          'script-src': ["'self'", "'unsafe-inline'"],

        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

``` after

// module.exports = [
//   'strapi::logger',
//   'strapi::errors',
//   'strapi::security',
//   {
//     name: 'strapi::security',
//     config: {
//       contentSecurityPolicy: {
//         useDefaults: true,
//         directives: {
//           'connect-src': ["'self'", 'https:'],
//           'img-src': [
//             "'self'",
//             'data:',
//             'blob:',
//             'market-assets.strapi.io',
//             'dhruv-website-cms.s3.ap-south-1.amazonaws.com',
//           ],
//           'media-src': [
//             "'self'",
//             'data:',
//             'blob:',
//             'market-assets.strapi.io',
//             'dhruv-website-cms.s3.ap-south-1.amazonaws.com',
//           ],
//           upgradeInsecureRequests: null,

//           'default-src': ["'self'"],
//           'script-src': ["'self'", "'unsafe-inline'"],

//         },
//       },
//     },
//   },
//   'strapi::cors',
//   'strapi::poweredBy',
//   'strapi::query',
//   'strapi::body',
//   'strapi::session',
//   'strapi::favicon',
//   'strapi::public',
// ];


module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'dhruv-website-cms.s3.ap-south-1.amazonaws.com',
            'ssl.gstatic.com', // ✅ Allow Google Images
            '*.googleusercontent.com', // ✅ Allow Google images
            '*.googleapis.com', // ✅ Allow Google APIs
            '*.gstatic.com' // ✅ Allow Google CDN
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'dhruv-website-cms.s3.ap-south-1.amazonaws.com',

          ],
          'default-src': ["'self'"],
          'script-src': [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'",
            'https://www.gstatic.com',// script allow of google to work or apis
            'https://www.google.com'
          ],
          'frame-src': ["'self'", 'https://www.google.com'], // If using iframes
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

```