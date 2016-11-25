var msgpack = require('msgpack-lite');

var options = {
  codec: msgpack.createCodec({
    binarraybuffer: true,
    preset: false
  })
};

module.exports.encode = function (object) {
  return msgpack.encode(object, options);
};

module.exports.decode = function (str) {
  str = new Uint8Array(str);
  return msgpack.decode(str, options);
};
