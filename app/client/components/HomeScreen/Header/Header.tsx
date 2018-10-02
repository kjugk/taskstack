import * as React from 'react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Logo from '../../../assets/images/logo.png';

class Header extends React.Component {
  render() {
    return (
      <Container style={{ lineHeight: 1, padding: '1.4rem 0', background: 'transparent' }}>
        <img src={Logo} style={{ width: '120px' }} />
      </Container>
    );
  }
}

export { Header };
