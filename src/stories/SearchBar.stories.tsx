import React from "react";
import SearchBar, { SearchBarProps } from "../components/SearchBar/SearchBar";

const story = {
  title: "SearchBar",
  component: SearchBar,
  argTypes: {
    className: { control: "text" },
    style: { control: "object" },
  },
};

function Template({ className, style }: SearchBarProps) {
  return <SearchBar className={className} style={style} />;
}

export const SearchBarNoStyle = Template.bind({});
SearchBarNoStyle.args = {};

export default story;
