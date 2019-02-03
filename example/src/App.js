import React, { Component } from 'react';
import withRemount from 'react-remount';

let initCalls = 0;

class MyLib extends Component {

  constructor(props) {
    super(props);
    // just to display re-mounts
    initCalls += 1;
  }

  render() {
    return (
      <div className="my-lib">
        <div>{`Number of times Wrapped Component was initiated: ${initCalls}`}</div>
      </div>
    );
  }
}

MyLib = withRemount(MyLib, props => console.log(props) || props.shouldRemountProp + props.someProp1);

/** ----------------------------- */

export default class App extends Component {
  state = {
    someValue: '',
    someOtherValue: ''
  }

  onChange = ({ target }) => this.setState({ [target.name]: target.value });

  render() {
    const { someValue, someOtherValue } = this.state;

    return (
      <div className="app">
        <div className="field">
          <div className="label">someValue</div>
          <input name="someValue" placeholder="someValue" value={someValue} onChange={this.onChange} />
        </div>
        <div className="field">
          <div className="label">someOtherValue (will trigger a re-mount)</div>
          <input name="someOtherValue" placeholder="someOtherValue" value={someOtherValue} onChange={this.onChange} />
        </div>
        <div>
          <hr />
        </div>
        <MyLib ref={ref => this.lib = ref} someProp1={someValue} shouldRemountProp={someOtherValue} />
      </div>
    )
  }
}
