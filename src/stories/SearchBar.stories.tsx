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

function Template({
  className,
  defaultValue,
  onChange,
  onSelect,
  onSubmit,
  options,
  placeholder,
  style,
  value,
}: SearchBarProps) {
  return (
    <SearchBar
      className={className}
      defaultValue={defaultValue}
      onChange={onChange}
      onSelect={onSelect}
      onSubmit={onSubmit}
      options={options}
      placeholder={placeholder}
      style={style}
      value={value}
    />
  );
}

export const SearchBarNoStyle = Template.bind({});
SearchBarNoStyle.args = {
  options: ['Option 1', 'Option 2', 'Option 3'],
  placeholder: 'Search',
};

export default story;
