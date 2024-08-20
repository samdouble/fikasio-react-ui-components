import React from "react";
import Warning, { WarningProps } from "../components/Warning/Warning";

const story = {
  title: "Warning",
  component: Warning,
  argTypes: {
    className: { control: "text" },
    style: { control: "object" },
  },
};

function Template({ children, className, style }: WarningProps) {
  return (
    <Warning className={className} style={style}>
      {children}
    </Warning>
  );
}

export const WarningNoStyle = Template.bind({});
WarningNoStyle.args = {};

export default story;
