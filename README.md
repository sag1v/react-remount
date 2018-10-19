# react-remount

> A simple component that injects a pre-defined prop as a key to the wrapped component, thus ensuring a re-mounting (a state reset) each time this prop is changed

[![NPM](https://img.shields.io/npm/v/react-remount.svg)](https://www.npmjs.com/package/react-remount) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-remount
```

## Usage

```jsx
import React, { Component } from 'react';
import withRemount from 'react-remount';

class MyLib extends Component {
  render () {
    const {name} = this.props
    return (
      <div>{`Hello ${name}`}</div>
    )
  }
}

MyLib = withRemount(MyLib, 'name');
export default MyLib;
```
#### Whenever the `name` prop will change, it will make `MyLib` to unmount and mount again.

## License

MIT © [sag1v](https://github.com/sag1v)
