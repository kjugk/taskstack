import * as React from 'react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  ${(props) => `background: ${props.theme.grey}`};
`;

const InnerWrapper = styled.div`
  display: flex;
  padding: 2rem 0;
  @media (max-width: 786px) {
    display: block;
    text-align: center;
  }
`;

const CopyRight = styled.div`
  flex: 1;
  font-size: 0.8rem;
  @media (max-width: 786px) {
    flex: none;
    font-weight: 800;
    margin-bottom: 0.5rem;
  }
`;

const HtmlLink = styled.a`
  font-size: 0.8rem;
  margin-left: 0.5rem;
  @media (max-width: 786px) {
    display: block;
  }
`;

const HomeFooter: React.SFC = () => {
  return (
    <Wrapper>
      <Container>
        <InnerWrapper>
          <CopyRight>&#9400; 2018 TaskStack</CopyRight>
          <div>
            <HtmlLink>TaskStackについて</HtmlLink>
            <HtmlLink href="https://goo.gl/forms/8NCdMMZcPWvwl5n03" target="_blank">
              お問い合わせ
            </HtmlLink>
            <Link to="/terms">利用規約</Link>
            <HtmlLink>プライバシーポリシー</HtmlLink>
          </div>
        </InnerWrapper>
      </Container>
    </Wrapper>
  );
};

export { HomeFooter };
