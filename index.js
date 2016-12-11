var msgpack = require('msgpack-lite');

var options = {
  codec: msgpack.createCodec({
    binarraybuffer: true,
    preset: false
  })
};

var compressPublishPacket = function (object) {
  if (object.event != '#publish' || object.data == null) {
    return;
  }

  var pubArray = [object.data.channel, object.data.data];

  if (object.cid != null) {
    pubArray.push(object.cid);
  }

  object.p = pubArray;

  delete object.event;
  delete object.data;
  delete object.cid;
};

var decompressPublishPacket = function (object) {
  if (object.p == null) {
    return;
  }

  object.event = '#publish';
  object.data = {
    channel: object.p[0],
    data: object.p[1]
  };
  if (object.p[2] != null) {
    object.cid = object.p[2];
  }
  delete object.p;
};

compressEmitPacket = function (object) {
  if (object.event == null) {
    return;
  }

  object.e = [object.event, object.data];
  if (object.cid != null) {
    object.e.push(object.cid);
  }
  delete object.event;
  delete object.data;
  delete object.cid;
};

decompressEmitPacket = function (object) {
  if (object.e == null) {
    return;
  }

  object.event = object.e[0];
  object.data = object.e[1];
  if (object.e[2] != null) {
    object.cid = object.e[2];
  }
  delete object.e;
};

compressResponsePacket = function (object) {
  if (object.rid == null) {
    return;
  }

  object.r = [object.rid, object.error, object.data];

  delete object.rid;
  delete object.error;
  delete object.data;
};

decompressResponsePacket = function (object) {
  if (object.r == null) {
    return;
  }

  object.rid = object.r[0];
  object.error = object.r[1];
  object.data = object.r[2];
  delete object.r;
};

var clonePacket = function (object) {
  var clone = {};
  for (var i in object) {
    if (object.hasOwnProperty(i)) {
      clone[i] = object[i];
    }
  }
  return clone;
};

module.exports.encode = function (object) {
  if (object && (object.event != null || object.rid != null)) {
    object = clonePacket(object);
    compressPublishPacket(object);
    compressEmitPacket(object);
    compressResponsePacket(object);
  }
  return msgpack.encode(object, options);
};

module.exports.decode = function (str) {
  str = new Uint8Array(str);
  var object = msgpack.decode(str, options);
  decompressEmitPacket(object);
  decompressPublishPacket(object);
  decompressResponsePacket(object);
  return object;
};
