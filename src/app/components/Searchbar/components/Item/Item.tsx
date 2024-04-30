import React from 'react';
import './Item.css';

type ItemProps = {
  id: number;
  title: string;
  image: string;
  onClick: (id: number) => void;
};

const Item: React.FC<ItemProps> = ({ id, title, image, onClick }) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <div className="result" onClick={handleClick}>
      <img src={image} alt={title} />
      <div>{title}</div>
    </div>
  );
};

export default Item;
