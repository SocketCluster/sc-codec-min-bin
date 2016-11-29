# sc-codec-min-bin
Minimal binary codec for SC based on MessagePack.
This codec helps reduce bandwidth usage and is ideal for games and other high-throughput applications.

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

Note that the codec used on the client and on the server always need to match.

---

## Contributing

To build the global script for the browser:

```bash
browserify -s scCodecMinBin index.js > sc-codec-min-bin.js
```
