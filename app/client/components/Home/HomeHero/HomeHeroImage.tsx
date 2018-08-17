import * as React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
  transform: skewX(-2deg);
  width: 320px;
  height: 320px;
`;

const HomeHeroImage: React.SFC = () => (
  <SVG>
    <title>Group 2</title>
    <desc>Created with Sketch.</desc>
    <defs />
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Group-2" fillRule="nonzero" stroke="#ffffff">
        <rect id="Rectangle-2" strokeWidth="8" x="4" y="4" width="312" height="312" />
        <g id="Group" transform="translate(26.000000, 40.000000)">
          <path d="M55.5,20.25 L267.5,20.25" id="Line" strokeWidth="8" strokeLinecap="square" />
          <rect id="Rectangle" strokeWidth="7" x="3.5" y="3.5" width="33" height="33" rx="3" />
        </g>
        <g id="Group-Copy" transform="translate(26.000000, 106.000000)">
          <path d="M55.5,20.25 L267.5,20.25" id="Line" strokeWidth="8" strokeLinecap="square" />
          <rect id="Rectangle" strokeWidth="7" x="3.5" y="3.5" width="33" height="33" rx="3" />
        </g>
        <g id="Group-Copy-2" transform="translate(26.000000, 172.000000)">
          <path d="M55.5,20.25 L267.5,20.25" id="Line" strokeWidth="8" strokeLinecap="square" />
          <rect id="Rectangle" strokeWidth="7" x="3.5" y="3.5" width="33" height="33" rx="3" />
        </g>
        <g id="Group-Copy-3" transform="translate(26.000000, 240.000000)">
          <path d="M55.5,20.25 L267.5,20.25" id="Line" strokeWidth="8" strokeLinecap="square" />
          <rect id="Rectangle" strokeWidth="7" x="3.5" y="3.5" width="33" height="33" rx="3" />
        </g>
        <polyline
          id="Line-2"
          strokeWidth="3.6"
          strokeLinecap="square"
          transform="translate(46.272063, 124.244377) rotate(-28.000000) translate(-46.272063, -124.244377) "
          points="39.1787533 119.111287 36.234974 129.377466 56.3091522 124.02335"
        />
      </g>
    </g>
  </SVG>
);

export { HomeHeroImage };
