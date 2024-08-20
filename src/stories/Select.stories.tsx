import React from "react";
import Select, { SelectProps } from "../components/Select/Select";

const story = {
  title: "Select",
  component: Select,
  argTypes: {
    className: { control: "text" },
    style: { control: "object" },
  },
};

function Template({
  className,
  defaultValue,
  name,
  onChange,
  options,
  style,
  value,
}: SelectProps) {
  return (
    <Select
      className={className}
      defaultValue={defaultValue}
      name={name}
      onChange={onChange}
      options={options}
      style={style}
      value={value}
    />
  );
}

export const SelectTwoOptions = Template.bind({});
SelectTwoOptions.args = {
  defaultValue: "B",
  menuPortalTarget: null,
  onChange: (value) => {
    console.info(value);
  },
  options: [
    {
      label: "A",
      value: "A",
    },
    {
      label: "B",
      value: "B",
    },
  ],
};

export default story;
