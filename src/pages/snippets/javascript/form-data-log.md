---
title: 'FormData Console Log'
type: 'log'
language: 'js'
---

Console log each entry added to a FormData object

<!--more-->

```js
function formDataLog(formData) {
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  })
  console.warn('FormDataLog')
  console.table(formDataObject)
}
```
