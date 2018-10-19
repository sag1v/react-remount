import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

function withRemount(Component, forwardKey) {
  class C extends React.Component {
    render() {
      const { forwardedRef, ...rest } = this.props;
      let asKey;
      if (typeof forwardKey === 'function') {
        asKey = forwardKey(rest);
      } else {
        asKey = rest[forwardKey];
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

export default withRemount;
