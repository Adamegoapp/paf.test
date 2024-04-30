import React, { useState, useCallback, useEffect } from 'react';
import './Searchbar.css';
import Item from './components/Item/Item';
import SearchHistory from './components/SearchHistory/SearchHistory';
import { GameData } from '../types';
import { Search } from '../Icons';

type SearchMatch = {
  id: number;
  title: string;
  image: string;
};

const Searchbar: React.FC<{ listsData: GameData | null }> = ({ listsData }) => {
  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState<SearchMatch[]>([]);
  const [latestSearches, setLatestSearches] = useState<string[]>(() => {
    const savedSearches = localStorage.getItem('latestSearches');
    return savedSearches ? JSON.parse(savedSearches) : [];
  });

  useEffect(() => {
    localStorage.setItem('latestSearches', JSON.stringify(latestSearches));
  }, [latestSearches]);

  useEffect(() => {
    if (!listsData) return;

    const updateMatches = (search: string) => {
      const filteredMatches: SearchMatch[] =
        search.trim() === ''
          ? []
          : listsData.lists
              .flatMap((list) =>
                list.items.map((item) => ({
                  id: item.id,
                  title: item.title,
                  image: item.image,
                }))
              )
              .filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase())
              );
      const uniqueMatches = Array.from(
        new Set(filteredMatches.map((match) => match.id))
      ).map((id) => filteredMatches.find((match) => match.id === id)!);

      setMatches(uniqueMatches);
    };

    updateMatches(query);
  }, [listsData, query]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSearch(query);
      }
    },
    [query]
  );

  const handleSearch = useCallback((search: string) => {
    if (search.trim() === '') return;

    setLatestSearches((prevSearches) => {
      const updatedSearches = [...prevSearches.slice(-9), search];
      return updatedSearches;
    });

    setQuery('');
    setMatches([]);
  }, []);

  const handlePastSearchClick = useCallback((search: string) => {
    setQuery(search);
  }, []);

  const handleMatchClick = useCallback(
    (id: number) => {
      const selectedItem = listsData?.lists
        .flatMap((list) => list.items)
        .find((item) => item.id === id);

      if (selectedItem) {
        handleSearch(selectedItem.title);
      }
    },
    [listsData, handleSearch]
  );

  return (
    <div className="searchbarContainer">
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search for games..."
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <div className="iconContainer">
          <Search />
        </div>
        {matches.length > 0 && (
          <div className="absoluteContainer">
            {matches.map(({ id, title, image }) => (
              <Item
                key={id}
                id={id}
                title={title}
                image={image}
                onClick={() => handleMatchClick(id)}
              />
            ))}
          </div>
        )}
      </div>
      <SearchHistory
        latestSearches={latestSearches}
        onSearchClick={handlePastSearchClick}
      />
    </div>
  );
};

export default Searchbar;
