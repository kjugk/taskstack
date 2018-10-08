import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Brand } from '../Brand';

const onClick = jest.fn();

describe('<Brand>', () => {
  it('fire onClick', () => {
    const wrapper = shallow(<Brand onClick={onClick} />);
    wrapper.simulate('click');

    expect(onClick).toBeCalled();
  });
});
