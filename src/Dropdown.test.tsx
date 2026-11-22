import React, { useState } from 'react';
import { describe, it, expect, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown } from '.';

const CustomToggle = React.forwardRef<HTMLButtonElement, {
  children?: React.ReactNode;
  onClick?: (event: React.SyntheticEvent) => void;
}>(({ children, onClick }, ref) => (
  <button
    onClick={event => {
      event.preventDefault();
      onClick?.(event);
    }}
    ref={ref}
    type="button"
  >
    {children}
  </button>
));

CustomToggle.displayName = 'CustomToggle';

describe('Dropdown', () => {
  it('Renders the menu closed', () => {
    render(
      <Dropdown>
        <Dropdown.Toggle>Actions</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Edit</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );

    expect(screen.getByRole('button', { name: 'Actions' }).getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByRole('button', { name: 'Edit' })).toBeNull();
    expect(document.querySelector('.dropdown-menu')).toBeNull();
  });

  it('Renders an open menu', () => {
    const { baseElement } = render(
      <Dropdown show>
        <Dropdown.Toggle>Actions</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Edit</Dropdown.Item>
          <Dropdown.Item active>Duplicate</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );

    expect(baseElement).toMatchSnapshot();
    expect(screen.getByRole('button', { name: 'Duplicate' }).classList.contains('active')).toBe(true);
  });

  it('Opens from the toggle and closes after an item click', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <Dropdown>
        <Dropdown.Toggle>Actions</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={onClick}>Edit</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );

    await user.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.getByRole('button', { name: 'Edit' })).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Edit' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(document.querySelector('.dropdown-menu')?.classList.contains('show')).toBe(false);
    expect(screen.queryByRole('button', { name: 'Edit' })).toBeNull();
  });

  it('Keeps the menu mounted after it closes', async () => {
    const user = userEvent.setup();
    render(
      <Dropdown>
        <Dropdown.Toggle>Actions</Dropdown.Toggle>
        <Dropdown.Menu data-testid="actions-menu">
          <Dropdown.Item>Edit</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );

    await user.click(screen.getByRole('button', { name: 'Actions' }));
    const menu = screen.getByTestId('actions-menu');
    expect(menu.classList.contains('show')).toBe(true);

    await user.click(screen.getByRole('button', { name: 'Edit' }));
    expect(menu.classList.contains('show')).toBe(false);
    expect(menu.hasAttribute('hidden')).toBe(true);
  });

  it('Closes on an outside click and on Escape', async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();
    render(
      <div>
        <Dropdown onToggle={onToggle}>
          <Dropdown.Toggle>Actions</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Edit</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <button type="button">Outside</button>
      </div>,
    );

    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.click(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByRole('button', { name: 'Edit' })).toBeNull();

    await user.click(screen.getByRole('button', { name: 'Actions' }));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('button', { name: 'Edit' })).toBeNull();
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  it('Leaves the menu open when a click inside should not close it', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <Dropdown autoClose="outside">
        <Dropdown.Toggle>Units</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={onClick}>Hours</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );

    await user.click(screen.getByRole('button', { name: 'Units' }));
    await user.click(screen.getByRole('button', { name: 'Hours' }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Hours' })).toBeTruthy();
  });

  it('Follows a controlled show value', async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();

    function Controlled() {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <Dropdown
          onToggle={next => {
            onToggle(next);
            setIsOpen(next);
          }}
          show={isOpen}
        >
          <Dropdown.Toggle as={CustomToggle}>Status</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Todo</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }

    render(<Controlled />);

    await user.click(screen.getByRole('button', { name: 'Status' }));
    expect(onToggle).toHaveBeenCalledWith(true);
    expect(screen.getByRole('button', { name: 'Todo' })).toBeTruthy();
  });
});
