import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Breadcrumb } from '.';

const items = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { label: 'Project A' },
];

describe('Breadcrumb', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(
      <Breadcrumb
        items={items}
      />,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('Marks the last item as the current page', () => {
    const { getByText } = render(
      <Breadcrumb
        items={items}
      />,
    );

    expect(getByText('Project A').getAttribute('aria-current')).toBe('page');
    expect(getByText('Home').closest('a')?.getAttribute('href')).toBe('/');
    expect(getByText('Projects').closest('a')?.getAttribute('href')).toBe('/projects');
  });

  it('Calls onClick for a clickable item', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Breadcrumb
        items={[
          { label: 'Home', onClick },
          { label: 'Current' },
        ]}
      />,
    );

    fireEvent.click(getByText('Home'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Does not render the last item as a link', () => {
    const { getByText } = render(
      <Breadcrumb
        items={[
          { href: '/', label: 'Home' },
          { href: '/current', label: 'Current' },
        ]}
      />,
    );

    expect(getByText('Current').closest('a')).toBeNull();
  });

  it('Renders a custom separator', () => {
    const { getAllByText } = render(
      <Breadcrumb
        items={items}
        separator=">"
      />,
    );

    expect(getAllByText('>')).toHaveLength(2);
  });

  it('Renders a non-interactive item as text', () => {
    const { getByText } = render(
      <Breadcrumb
        items={[
          { label: 'Home' },
          { label: 'Current' },
        ]}
      />,
    );

    expect(getByText('Home').tagName).toBe('SPAN');
    expect(getByText('Home').closest('a')).toBeNull();
    expect(getByText('Home').closest('button')).toBeNull();
  });
});
