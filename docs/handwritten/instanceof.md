# instanceof

ð¡ **Guide:**

1. ååå¾å½åå®ä¾çååå¯¹è±¡ `proto`ï¼å³æ¾å°å½åå®ä¾å¯¹è±¡ç**ååé¾**
2. é¡ºçååé¾å¾ä¸æ¥æ¾ï¼

- å¦ææ¾å° `proto` ä¸ `classFunc` çåå `prototype` ç¸ç­ï¼åè¿å true
- å½ `proto` ç­äº null æ¶ï¼è¯´æååé¾ä¸æ²¡æç¬¦åæ¡ä»¶ç `proto`ï¼è¿å false

## å®ç°

```js
function _instanceof(example, classFunc) {
  // ç±äº incetanceof è¦æ£æµçæ¯å¯¹è±¡ï¼å¼ç¨ç±»åï¼ï¼æä»¥è¦æè¿ä¸ªåç½®å¤æ­ï¼
  // å¦ææ¯åå§æ°æ®ç±»åï¼ç´æ¥è¿å false
  if(typeof example !== 'object' || example === null) return false

  let proto = example.__proto__  // ååé¾ä¸çååå¯¹è±¡
  while(true) {
    if(proto === null) return false
    // å¦æå¨å®ä¾å¯¹è±¡çååé¾ä¸æ¾å°äºå½åç±»ï¼è¿åtrue
    if(proto === classFunc.prototype) return true
    // å¦åé¡ºçååé¾å¾ä¸ç»§ç»­æ¾
    proto = proto.__proto__
  }
}
```

## ä½¿ç¨

```js
console.log(_instanceof(null, Object));  // false
console.log(_instanceof([], Array));  // true
console.log(_instanceof({}, Object));  // true
```
