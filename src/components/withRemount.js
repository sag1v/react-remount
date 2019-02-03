import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import invariant from 'invariant';
import { invariantMessageType, invariantMessageUndefined } from '../helpers/invariantMessages';

function withRemount(Component, forwardKey) {
  const forwardKeyType = typeof forwardKey;
  const isKeyValid = forwardKey && (forwardKeyType === 'function' || forwardKeyType === 'string');
  invariant(
    isKeyValid,
    invariantMessageType(forwardKeyType, forwardKey)
  );

  class C extends React.Component {
    render() {
      const { forwardedRef, ...rest } = this.props;
      let asKey;
      if (typeof forwardKey === 'function') {
        // we accept a function (props) => props.key
        asKey = forwardKey(rest);
        const asKeyType = typeof asKey;
        const isKeyValidString = asKeyType === 'string';
        invariant(isKeyValidString, invariantMessageType(asKeyType, asKey));
      } else {
        // we accept a string "key"
        asKey = rest[forwardKey];
        const isInProps = rest.hasOwnProperty(forwardKey);
        invariant(isInProps, invariantMessageUndefined(forwardKey));
      }
      return <Component key={asKey} ref={forwardedRef} {...rest} />;
    }
  }
  C.displayName = `withRemount(${Component.displayName || Component.name})`;
  const WithStaticProps = hoistNonReactStatics(C, Component);
  const withRef = React.forwardRef((props, ref) => {
    return <WithStaticProps {...props} forwardedRef={ref} />;
  });

  return withRef;
}

withRemount.propTypes = {
  Component: PropTypes.element,
  forwardKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};

export default withRemount;
