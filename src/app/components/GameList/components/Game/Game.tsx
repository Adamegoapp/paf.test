import React from 'react';
import './Game.css';
import { Item } from 'app/components/types';

const Game: React.FC<Item> = ({ id, title, image }) => {
  return (
    <li className="gameBox">
      <div className="border">
        <img src={image} alt={title} />
      </div>
      <p>{title}</p>
    </li>
  );
};

export default Game;
