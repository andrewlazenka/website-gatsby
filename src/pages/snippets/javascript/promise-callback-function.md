---
title: 'Promise for Callback Function'
type: 'promise'
language: 'js'
---

Resolve a value that gets returned in the callback of a function (async
operation) using a Promise.

<!--more-->

```js
return new Promise((resolve, reject) => {
  functionWithCallback(cbValue => {
    resolve(cbValue)
  })
  .on('error', err => {
    reject('Error: ' + err.message)
  })
}
```
