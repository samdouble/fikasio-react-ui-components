import React from 'react';
import { render } from '@testing-library/react';
import { Icon } from '.';

describe('Icon', () => {
  it('Renders caret-left correctly', () => {
    const { baseElement } = render(<Icon name="caret-left" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders caret-right correctly', () => {
    const { baseElement } = render(<Icon name="caret-right" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders download correctly', () => {
    const { baseElement } = render(<Icon name="download" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders list correctly', () => {
    const { baseElement } = render(<Icon name="list" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders th correctly', () => {
    const { baseElement } = render(<Icon name="th" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders calendar-alt correctly', () => {
    const { baseElement } = render(<Icon name="calendar-alt" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders times correctly', () => {
    const { baseElement } = render(<Icon name="times" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders cog correctly', () => {
    const { baseElement } = render(<Icon name="cog" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders user correctly', () => {
    const { baseElement } = render(<Icon name="user" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders book correctly', () => {
    const { baseElement } = render(<Icon name="book" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders sitemap correctly', () => {
    const { baseElement } = render(<Icon name="sitemap" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders power-off correctly', () => {
    const { baseElement } = render(<Icon name="power-off" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders copy correctly', () => {
    const { baseElement } = render(<Icon name="copy" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders plus correctly', () => {
    const { baseElement } = render(<Icon name="plus" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders archive correctly', () => {
    const { baseElement } = render(<Icon name="archive" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders stopwatch correctly', () => {
    const { baseElement } = render(<Icon name="stopwatch" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders message correctly', () => {
    const { baseElement } = render(<Icon name="message" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders edit correctly', () => {
    const { baseElement } = render(<Icon name="edit" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders check correctly', () => {
    const { baseElement } = render(<Icon name="check" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders bars correctly', () => {
    const { baseElement } = render(<Icon name="bars" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders project-diagram correctly', () => {
    const { baseElement } = render(<Icon name="project-diagram" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders sliders correctly', () => {
    const { baseElement } = render(<Icon name="sliders" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders shapes correctly', () => {
    const { baseElement } = render(<Icon name="shapes" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders clock correctly', () => {
    const { baseElement } = render(<Icon name="clock" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders check-square correctly', () => {
    const { baseElement } = render(<Icon name="check-square" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders bullseye correctly', () => {
    const { baseElement } = render(<Icon name="bullseye" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders bell correctly', () => {
    const { baseElement } = render(<Icon name="bell" />);
    expect(baseElement).toMatchSnapshot();
  });
});
