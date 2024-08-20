import React from "react";
import Input, { InputProps } from "../components/Input/Input";

const story = {
  title: "Input",
  component: Input,
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
  style,
  value,
}: InputProps) {
  return (
    <Input
      className={className}
      defaultValue={defaultValue}
      name={name}
      onChange={onChange}
      style={style}
      value={value}
    />
  );
}

export const InputUnchecked = Template.bind({});
InputUnchecked.args = {};

export default story;
