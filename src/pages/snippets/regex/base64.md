---
title: 'Valid Base64 String Regex'
type: 'regex'
language: 'js'
---

Regex to test for a valid base64 string. Encoding at the start of the string must
be removed (e.g. ~~data:image/gif;base64,~~R0lGOD...==)

<!--more-->

```js
const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
```
