# sc-codec-min-bin
Minimal binary codec for SC based on MessagePack.

This module is designed to be hooked up on both the client and server.

To install, use:

```bash
npm install sc-codec-min-bin
```

On the server, inside `worker.js`, you should use:

```js
var scCodecMinBin = require('sc-codec-min-bin');

// ...
// This needs to go inside the run function - Near the top.
worker.scServer.setCodecEngine(scCodecMinBin);
```

On the client-side, you can either include the `sc-codec-min-bin` module using
your favorite bundler such as Browserify or Webpack or you can include the `sc-codec-min-bin.js`
file using a script tag; this will expose the `scCodecMinBin` object globally.
To use it, you just need to add it on connect:

```js
var socket = socketCluster.connect({
  // ...
  codecEngine: scCodecMinBin
});
```

Note that you need to set it up properly on both the client and server or else it won't work.

---

## Contributing

To build global script for browser:

```bash
browserify -s scCodecMinBin index.js > sc-codec-min-bin.js
```
