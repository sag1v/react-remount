import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import withRemount from './withRemount';
import Test from './Test';

Enzyme.configure({ adapter: new Adapter() });

it('should pass the key to the wrapped component', () => {
  const myKey = 'prop1';
  const WithRemount = withRemount(Test, myKey);
  const wrapper = mount(<WithRemount prop1='prop1' prop2='prop2' />);
  const Child = wrapper.find(Test);
  const passedKey = Child.key();
  expect(passedKey).toBe(myKey);
});

it('forwardKey as string -> should call componentWillUnmount on key change', () => {
  const myKey = 'prop1';
  const WithRemount = withRemount(Test, myKey);
  const didMount = sinon.spy();
  const willUnmount = sinon.spy();
  const wrapper = mount(
    <WithRemount
      sinon={{ willUnmount, didMount }}
      prop1='prop1'
      prop2='prop2'
    />
  );
  expect(wrapper).toBeDefined();
  expect(didMount.callCount).toBe(1);
  expect(willUnmount.callCount).toBe(0);
  wrapper.setProps({ [myKey]: 'newProp' });
  expect(didMount.callCount).toBe(2);
  expect(willUnmount.callCount).toBe(1);
});

it('forwardKey as function -> should call componentWillUnmount on key change', () => {
  const myKey = ({ prop1, prop2 }) => `${prop1}${prop2}`;
  const WithRemount = withRemount(Test, myKey);
  const didMount = sinon.spy();
  const willUnmount = sinon.spy();
  const wrapper = mount(
    <WithRemount
      sinon={{ willUnmount, didMount }}
      prop1='prop1'
      prop2='prop2'
    />
  );
  expect(wrapper).toBeDefined();
  expect(didMount.callCount).toBe(1);
  expect(willUnmount.callCount).toBe(0);

  wrapper.setProps({ prop2: 'newProp' });
  expect(didMount.callCount).toBe(2);
  expect(willUnmount.callCount).toBe(1);

  wrapper.setProps({ prop1: 'newProp' });
  expect(didMount.callCount).toBe(3);
  expect(willUnmount.callCount).toBe(2);
});

// it('should pass ref forward to wrapped component', () => {
//   const myKey = 'prop1';
//   const WithRemount = withRemount(Test, myKey);
//   const wrapper = mount(<WithRemount ref={ref => this.myRef = ref} prop1='prop1' prop2='prop2' />);
//   const Child = wrapper.find(Test);
//   const passedKey = Child.key();
//   expect(passedKey).toBe(myKey);
// });
