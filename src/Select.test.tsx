import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '.';

describe('Select', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(
      <Select
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ]}
      />,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('closes the menu when clicking outside', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Select
          options={[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
          ]}
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
