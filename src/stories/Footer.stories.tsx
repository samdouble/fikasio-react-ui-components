import React from 'react';
import Footer, { FooterProps } from '../components/Footer/Footer';

const story = {
  title: 'Footer',
  component: Footer,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
};

function Template({ className, style }: FooterProps) {
  return (
    <Footer
      className={className} style={style}
      childrenLeft={[<div key="1">Child 1</div>]}
      childrenCenter={[<div key="2">Child 2</div>]}
      childrenRight={[<div key="3">Child 3</div>]}
      childrenTop={[<div key="4">Child 4</div>]}
    />
  );
}

export const FooterNoStyle = Template.bind({});
FooterNoStyle.args = {};

export default story;
