# sc-codec-min-bin
Minimal binary codec for SC based on MessagePack.

This module is designed to be hooked up on both the client and server.

On the server, inside `worker.js`, you should use:

```js
var scCodecBinMin = require('sc-codec-bin-min');
worker.scServer.setCodecEngine(scCodecBinMin);
```

On the client-side, you can either include the 'sc-codec-bin-min' module using
your favorite bundler such as Browserify or Webpack or you can include the `sc-codec-bin-min.js`
file using a script tag; this will expose the `scCodecBinMin` object globally.
To use it, you just need to add it on connect:

```js
var socket = socketCluster.connect({
  // ...
  codecEngine: scCodecBinMin
});
```

Note that you need to set it up properly on both the client and server or else it won't work.

---

## Contributing

To build global script for browser:
browserify -s scCodecBinMin index.js > sc-codec-bin-min.js
