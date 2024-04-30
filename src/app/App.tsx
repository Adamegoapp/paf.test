import React, { useEffect, useState, useCallback } from 'react';
import GameList from './components/GameList/GameList';
import './App.css';
import Searchbar from './components/Searchbar/Searchbar';
import { GameData } from './components/types';
import Filter from './components/Filter/Filter';

const App: React.FC = () => {
  const [listsData, setListsData] = useState<GameData | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('../api/games/lists.json');
        const data: GameData = await response.json();
        setListsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleFilter = useCallback(
    (filter: string) => {
      setSelectedFilters((prevFilters) =>
        prevFilters.includes(filter)
          ? prevFilters.filter((f) => f !== filter)
          : [...prevFilters, filter]
      );
    },
    [setSelectedFilters]
  );

  const handleResetFilters = useCallback(() => {
    setSelectedFilters([]);
  }, [setSelectedFilters]);

  return (
    <div className="main">
      {listsData && (
        <>
          <Searchbar listsData={listsData} />
          <h1 style={{ borderBottom: '1px solid black', paddingBottom: '5px' }}>
            {listsData.title}
          </h1>
          <p>{listsData.description}</p>
          <Filter
            lists={listsData.lists}
            selectedFilters={selectedFilters}
            onFilterClick={toggleFilter}
            onResetFilters={handleResetFilters}
          />
          {listsData.lists.map((list) => (
            <GameList key={list.id} list={list} filters={selectedFilters} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
