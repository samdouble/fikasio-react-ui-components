import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Selector } from '.';

describe('Selector', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(
      <Selector
        options={['Option 1', 'Option 2', 'Option 3']}
      />,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('closes the menu when clicking outside', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Selector
          options={['Option 1', 'Option 2', 'Option 3']}
          render={value => <span>{value}</span>}
        />
        <button type="button">outside</button>
      </div>,
    );

    await user.click(screen.getByRole('button', { name: 'Option 1' }));
    expect(screen.getByRole('option', { name: 'Option 2' })).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'outside' }));
    expect(screen.queryByRole('option', { name: 'Option 2' })).toBeNull();
  });
});
