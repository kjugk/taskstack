import * as React from 'react';
import Responsive from 'semantic-ui-react/dist/commonjs/addons/Responsive';
import styled from 'styled-components';
import { Brand } from '../Brand/Brand';

const PcSidebar = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  width: 260px;
  ${(props) => `
    background: ${props.theme.grey};
    border-right: 1px solid ${props.theme.border};
  `};
`;

const MobileSidebar = styled<{ open: boolean }, any>('div')`
  left: 0;
  top: 0;
  position: absolute;
  width: 90%;
  display: flex;
  flex-direction: column;
  height: 100%;
  z-index: 3;
  will-change: transform;
  transform: translateX(-100%);
  transition: transform 0.25s linear;
  ${(props) => `
    background: ${props.theme.grey};
    ${props.open && 'transform: translate3D(0, 0, 0);'}
  `};
`;

const MobileOverlay = styled<{ open: boolean }, any>('div')`
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  position: absolute;
  height: 100%;
  z-index: 2;
  opacity: 0;
  width: 0;
  will-change: opacity;
  transition: opacity 0.2s ease;
  ${(props) => props.open && 'opacity: 1; width: 100%;'};
`;

const Header = styled.div`
  padding: 0.8rem 1rem;
  line-height: 1;
  ${(props) => `
    background: ${props.theme.main};
  `};
`;

interface Props {
  open: boolean;
  onClose(): any;
}

export const Sidebar: React.SFC<Props> = ({ open, onClose, children }) => (
  <>
    <Responsive as={PcSidebar} minWidth={768}>
      {children}
    </Responsive>

    <Responsive as={MobileSidebar} maxWidth={767} open={open}>
      <Header>
        <Brand onClick={() => onClose()} />
      </Header>
      {children}
    </Responsive>

    <Responsive as={MobileOverlay} maxWidth={767} open={open} onClick={onClose} />
  </>
);
