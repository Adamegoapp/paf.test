import React from 'react';
import Game from './components/Game/Game';
import './GameList.css';
import { List } from '../types';

type GameListProps = {
  list: List;
  filters: string[];
};

const GameList: React.FC<GameListProps> = ({ list, filters }) => {
  const isListSelected = filters.includes(list.title) || filters.length === 0;

  const filteredItems = isListSelected
    ? list.items
    : list.items.filter(
        (item) => item.provider && filters.includes(item.provider)
      );

  return (
    <div className="container">
      {isListSelected && <h2>{list.title}</h2>}
      <div className="gameList">
        {filteredItems.map((item) => (
          <Game
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default GameList;
