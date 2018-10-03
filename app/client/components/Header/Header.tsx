import * as React from 'react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import { Brand } from '../Brand/Brand';
import styled from 'styled-components';

interface Props {
  style?: object;
  onClickBrand?(): any;
}

const Wrapper = styled.div`
  padding: 1rem 0;
  line-height: 1;
  ${(props) => `background: ${props.theme.main}`};
`;

class Header extends React.Component<Props> {
  static defaultProps = {
    style: {}
  };

  render() {
    const { style, onClickBrand } = this.props;

    return (
      <Wrapper style={{ ...style }}>
        <Container>
          <Brand onClick={onClickBrand} style={onClickBrand && { cursor: 'pointer' }} />
        </Container>
      </Wrapper>
    );
  }
}

export { Header };
