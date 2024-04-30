import React from 'react';
import './SearchHistory.css';

type SearchHistoryProps = {
  latestSearches: string[];
  onSearchClick: (search: string) => void;
};

const SearchHistory: React.FC<SearchHistoryProps> = ({
  latestSearches,
  onSearchClick,
}) => {
  return (
    <div className="history">
      <p style={{ fontSize: '14px' }}>Search History:</p>
      {latestSearches.length ? (
        <div className="searches">
          {latestSearches.map((search, i) => (
            <span
              className="word"
              key={i}
              onClick={() => onSearchClick(search)}
            >
              {search}
            </span>
          ))}
        </div>
      ) : (
        <span style={{ fontSize: '14px' }}> No recent searches</span>
      )}
    </div>
  );
};
export default SearchHistory;
