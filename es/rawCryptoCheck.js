import ProxyPromise from './proxyPromise';
export function isSupportRawCryptoCTR() {
  var proxyPromise = new ProxyPromise();
  var crypto = window.crypto || window.msCrypto;

  if (!crypto) {
    proxyPromise.resolve(false);
    return proxyPromise;
  }

  var iv = new Uint8Array(16);
  var raw = new Uint8Array([1]);
  var savedKey = null;

  try {
    crypto.subtle.generateKey({
      name: 'AES-CTR',
      length: 256
    }, false, ['encrypt', 'decrypt']).then(function (key) {
      savedKey = key;
      return crypto.subtle.encrypt({
        name: 'AES-CTR',
        counter: iv,
        length: 128
      }, key, raw);
    }).then(function (encrypted) {
      return crypto.subtle.decrypt({
        name: 'AES-CTR',
        counter: iv,
        length: 128
      }, savedKey, encrypted);
    }).then(function (decrypted) {
      var decryptedArray = new Uint8Array(decrypted);
      proxyPromise.resolve(decryptedArray[0] === raw[0]);
    }).catch(function () {
      proxyPromise.resolve(false);
    });
  } catch (error) {
    proxyPromise.resolve(false);
  }

  return proxyPromise;
}