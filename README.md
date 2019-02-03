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
    const {firstName, lastName} = this.props
    return (
      <div>{`Hello ${firstName} ${lastName}`}</div>
    )
  }
}

MyLib = withRemount(MyLib, 'firstName');
export default MyLib;
```

### Now when ever we use `MyLib`, `react-remount` will inject the value of `firstName` as a key.
```
<MyLib firstName="John" lastName="Doe>
```

*We can also pass a function to `withRemount`, as long as this function returns a string*.  
*This is helpful when you want to chain multiple props as your key*:
```
MyLib = withRemount(MyLib, props => props.firstName + props.lastName);
```

## License

MIT © [sag1v](https://github.com/sag1v)
