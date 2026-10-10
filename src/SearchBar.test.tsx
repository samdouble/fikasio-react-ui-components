import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '.';

describe('SearchBar', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(<SearchBar />);
    expect(baseElement).toMatchSnapshot();
  });

  it('shows the given options when filtering is off', async () => {
    const user = userEvent.setup();
    render(
      <SearchBar
        filterOptions={false}
        options={['Beta']}
        value="zzz"
      />,
    );

    await user.click(screen.getByRole('textbox'));

    expect(screen.getByRole('option', { name: 'Beta' })).toBeTruthy();
  });

  it('selects a custom option', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(
      <SearchBar
        ariaLabel="search"
        filterOptions={false}
        getOptionKey={option => option.id}
        onSelect={onSelect}
        options={[{ id: '1', name: 'Alpha' }]}
        renderOption={option => (
          <span className="fikasio-searchbar-option-label">{option.name}</span>
        )}
        type="search"
        value="Al"
      />,
    );

    await user.click(screen.getByRole('searchbox', { name: 'search' }));
    await user.click(screen.getByRole('option', { name: 'Alpha' }));

    expect(onSelect).toHaveBeenCalledWith({ id: '1', name: 'Alpha' });
  });

  it('submits the current query when Enter is pressed without a highlighted option', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(
      <SearchBar
        ariaLabel="search"
        onSubmit={onSubmit}
        type="search"
        value="notes"
      />,
    );

    await user.type(screen.getByRole('searchbox', { name: 'search' }), '{Enter}');

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
