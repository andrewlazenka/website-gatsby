---
title: 'Loading Line'
type: 'animation'
language: 'css'
keywords:
  - 'css'
  - 'loading'
  - 'animation'
---

CSS class to create a Facebook-like loading line. Useful as an application loading
indicator.

<!--more-->

```css
@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

.loading-line {
  height: 10px;
  width: 100%;
  margin: 4px 0;
  animation-duration: 1.25s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #f6f6f6;
  background: linear-gradient(to right, #f6f6f6 8%, #f6f6f6 18%, #f6f6f6 33%);
  background-size: 800px 104px;
  position: relative;
  border-radius: 16px;
}
```
