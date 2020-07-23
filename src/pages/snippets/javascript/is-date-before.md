---
title: 'isDateBefore'
type: 'date'
language: 'js'
---

Compares two vanilla Javascript Date objects. Returns true is the first date
falls before the second.

<!--more-->

```js
function isDateBefore(date1, date2) {
  if (date1.getFullYear() < date2.getFullYear()) {
    return true
  }
  if (date1.getMonth() < date2.getMonth()) {
    return true
  }
  if (date1.getDate() < date2.getDate()) {
    return true
  }
  return false
}
```
