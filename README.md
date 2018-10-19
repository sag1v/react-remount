# react-remount

> A simple react HOC that inject a predifined key to ensure remount for the wrapped component when the key changed

[![NPM](https://img.shields.io/npm/v/react-remount.svg)](https://www.npmjs.com/package/react-remount) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-remount
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'react-remount'

class Example extends Component {
  render () {
    return (
      <MyComponent />
    )
  }
}
```

## License

MIT © [sag1v](https://github.com/sag1v)
