import React from 'react';
import './FilterButton.css';

type FilterButtonProps = {
  title: string;
  selected: boolean;
  onClick: () => void;
};

const FilterButton: React.FC<FilterButtonProps> = ({
  title,
  selected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={selected ? 'filterbutton selected' : 'filterButton'}
    >
      {title}
    </button>
  );
};

export default FilterButton;
