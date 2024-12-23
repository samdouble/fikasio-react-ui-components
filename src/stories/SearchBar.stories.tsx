import React from 'react';
import SearchBar, { SearchBarProps } from '../components/SearchBar/SearchBar';

const story = {
  title: 'SearchBar',
  component: SearchBar,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
};

function Template({ className, options, placeholder, style }: SearchBarProps) {
  return (
    <SearchBar
      className={className}
      options={options}
      placeholder={placeholder}
      style={style}
    />
  );
}

export const SearchBarNoStyle = Template.bind({});
SearchBarNoStyle.args = {
  options: ['Option 1', 'Option 2', 'Option 3'],
  placeholder: 'Search',
};

export default story;
