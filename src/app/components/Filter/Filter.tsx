import React from 'react';
import FilterButton from './components/FilterButton/FilterButton';
import { List } from '../types';
import './Filter.css';

type FilterProps = {
  lists: List[];
  selectedFilters: string[];
  onFilterClick: (filter: string) => void;
  onResetFilters: () => void;
};

const Filter: React.FC<FilterProps> = ({
  lists,
  selectedFilters,
  onFilterClick,
  onResetFilters,
}) => {
  return (
    <div className="buttonContainer">
      <FilterButton
        title="All"
        selected={selectedFilters.length === 0}
        onClick={onResetFilters}
      />
      {lists.map((list) => (
        <FilterButton
          key={list.id}
          title={list.title}
          selected={selectedFilters.includes(list.title)}
          onClick={() => onFilterClick(list.title)}
        />
      ))}
    </div>
  );
};

export default Filter;
