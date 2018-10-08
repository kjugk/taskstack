import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { TasklistCreateButton } from '../TasklistCreateButton';

const onClick = jest.fn();

describe('<TasklistCreateButton />', () => {
  it('fire onClick', () => {
    const wrapper = mount(<TasklistCreateButton onClick={onClick} />);
    wrapper.find('button').simulate('click');

    expect(onClick).toBeCalled();
  });
});
