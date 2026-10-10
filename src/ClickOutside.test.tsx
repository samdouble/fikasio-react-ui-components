import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ClickOutside } from '.';

describe('ClickOutside', () => {
  it('Should call onClickOutside when clicking outside the container', () => {
    const onClickOutside = jest.fn();
    render(
      <div>
        <ClickOutside onClickOutside={onClickOutside}>
          <button type="button">inside</button>
        </ClickOutside>
        <button type="button">outside</button>
      </div>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'inside' }));
    expect(onClickOutside).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'outside' }));
    expect(onClickOutside).toHaveBeenCalledTimes(1);
  });

  it('Should ignore the click that follows a touch outside the container', () => {
    const onClickOutside = jest.fn();
    render(
      <div>
        <ClickOutside onClickOutside={onClickOutside}>
          <button type="button">inside</button>
        </ClickOutside>
        <button type="button">outside</button>
      </div>,
    );

    fireEvent.touchEnd(screen.getByRole('button', { name: 'outside' }));
    fireEvent.click(screen.getByRole('button', { name: 'outside' }));

    expect(onClickOutside).toHaveBeenCalledTimes(1);
  });
});
