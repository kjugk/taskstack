import * as React from 'react';
import Logo from '../../assets/images/logo.png';

interface Props {
  inverse?: boolean;
  style?: object;
  onClick?(): any;
}

class Brand extends React.Component<Props> {
  static defaultProps = {
    inverse: false,
    style: {}
  };

  constructor(props: Props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const { style } = this.props;

    return <img src={Logo} style={{ width: '120px', ...style }} onClick={this.handleClick} />;
  }

  private handleClick() {
    const { onClick } = this.props;

    if (typeof onClick === 'undefined') return;

    onClick();
  }
}

export { Brand };
