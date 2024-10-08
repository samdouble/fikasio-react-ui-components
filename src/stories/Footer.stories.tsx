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
  return <Footer className={className} style={style} />;
}

export const FooterNoStyle = Template.bind({});
FooterNoStyle.args = {};

export default story;
