interface Theme {
  main: string;
  white: string;
  black: string;
  grey: string;
  lightGrey: string;
  darkGrey: string;
  border: string;
  lightBlue: string;
}

export const theme: Theme = {
  main: 'rgba(33, 133, 208, 1)',
  // main: '#1d127d',
  white: 'rgba(255, 255, 255, 1)',
  black: 'rgba(31, 31, 45, 1)',
  grey: 'rgba(241, 241, 242, 1)',
  lightGrey: 'rgb(251, 251, 251)',
  darkGrey: 'rgb(224, 225, 226)',
  border: 'rgba(221, 222, 223, 1)',
  lightBlue: 'rgb(198, 228, 250)'
};
