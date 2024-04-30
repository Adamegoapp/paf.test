import * as React from 'react';

interface SearchProps {
  [key: string]: any;
}

const Search: React.FC<SearchProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      cx="11"
      cy="11"
      r="6"
      stroke="#04aa6d"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 19L15.5 15.5"
      stroke=" #04aa6d"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Search;
