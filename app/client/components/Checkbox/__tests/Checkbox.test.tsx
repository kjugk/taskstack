import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Checkbox from '../Checkbox';

const onClick = jest.fn();

describe('<Checkbox />', () => {
  describe('renders correctly', () => {
    const wrapper = shallow(<Checkbox checked={false} onClick={onClick} theme={{}} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('fire onClick', () => {
    const wrapper = mount(<Checkbox checked={true} onClick={onClick} theme={{}} />);
    wrapper.find('a').simulate('click');
    expect(onClick).toBeCalled();
  });

  describe('icon', () => {
    // Icon が切り替わるか
    it('have checkbox icon', () => {
      const wrapper = mount(<Checkbox checked={true} onClick={onClick} theme={{}} />);
      expect(wrapper.find('i.check')).toHaveLength(1);
    });

    it('have square icon', () => {
      const wrapper = mount(<Checkbox checked={false} onClick={onClick} theme={{}} />);
      expect(wrapper.find('i.square.outline')).toHaveLength(1);
    });
  });
});
