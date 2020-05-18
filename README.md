# utils 

## ProxyPromise
proxy for promise
代理Promise，简化Promise使用
```js
    let proxyPromise = new ProxyPromise();
    proxyPromise.resolve()

    proxyPromise.reject()
```

## Xml2Json
支持IE9+
使用原生DOMParser 解析XML， 客户端使用，轻便体积小

```js
Xml2Json.parse(xmlstring)
```

## RawCryptoCheck
检测浏览器是否支持 Crypto + CTR

## XmlUtils
提供Xml解析处理逻辑

## Utils
提供解析时间等方法