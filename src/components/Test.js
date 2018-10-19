import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Test extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.props.sinon.didMount;
    this.componentWillUnmount = this.props.sinon.willUnmount;
  }

  render() {
    const { prop1, prop2 } = this.props;
    return <div>{`${prop1} ${prop2}`}</div>;
  }
}

Test.defaultProps = {
  sinon: {
    didMount: () => { },
    willUnmount: () => { }
  }
};

Test.propTypes = {
  sinon: PropTypes.object,
  prop1: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prop2: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Test;
