import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Tabs } from '.';

const options = [
  { content: 'Overview content', label: 'Overview', value: 'overview' },
  { content: 'Details content', label: 'Details', value: 'details' },
  { content: 'Settings content', disabled: true, label: 'Settings', value: 'settings' },
];

describe('Tabs', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(
      <Tabs
        options={options}
      />,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('Shows the selected tab content', () => {
    const { getByText, queryByText } = render(
      <Tabs
        defaultValue="details"
        options={options}
      />,
    );

    expect(getByText('Details content')).toBeTruthy();
    expect(queryByText('Overview content')).toBeNull();
  });

  it('Changes tab on click', () => {
    const onChange = jest.fn();
    const { getByText, queryByText } = render(
      <Tabs
        onChange={onChange}
        options={options}
      />,
    );

    fireEvent.click(getByText('Details'));

    expect(onChange).toHaveBeenCalledWith('details');
    expect(getByText('Details content')).toBeTruthy();
    expect(queryByText('Overview content')).toBeNull();
  });

  it('Does not select a disabled tab', () => {
    const onChange = jest.fn();
    const { getByText, queryByText } = render(
      <Tabs
        onChange={onChange}
        options={options}
      />,
    );

    fireEvent.click(getByText('Settings'));

    expect(onChange).not.toHaveBeenCalled();
    expect(getByText('Overview content')).toBeTruthy();
    expect(queryByText('Settings content')).toBeNull();
  });

  it('Moves to the next enabled tab with the arrow keys', () => {
    const { getByRole, getByText, queryByText } = render(
      <Tabs
        options={options}
      />,
    );

    fireEvent.keyDown(getByRole('tab', { name: 'Overview' }), { key: 'ArrowRight' });

    expect(getByText('Details content')).toBeTruthy();
    expect(queryByText('Overview content')).toBeNull();
  });

  it('Skips disabled tabs when using arrow keys', () => {
    const { getByRole, getByText } = render(
      <Tabs
        defaultValue="details"
        options={options}
      />,
    );

    fireEvent.keyDown(getByRole('tab', { name: 'Details' }), { key: 'ArrowRight' });

    expect(getByText('Overview content')).toBeTruthy();
  });
});
