import React, { useRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import useClickOutside from './useClickOutside';

function Harness({ onClickOutside }: { onClickOutside: (event: Event) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClickOutside);
  return (
    <div>
      <div ref={ref}>
        <button type="button">inside</button>
      </div>
      <button type="button">outside</button>
    </div>
  );
}

describe('useClickOutside', () => {
  it('Should call onClickOutside when clicking outside the element', () => {
    const onClickOutside = jest.fn();
    render(<Harness onClickOutside={onClickOutside} />);

    fireEvent.click(screen.getByRole('button', { name: 'inside' }));
    expect(onClickOutside).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'outside' }));
    expect(onClickOutside).toHaveBeenCalledTimes(1);
  });

  it('Should ignore the click that follows a touch outside the element', () => {
    const onClickOutside = jest.fn();
    render(<Harness onClickOutside={onClickOutside} />);

    fireEvent.touchEnd(screen.getByRole('button', { name: 'outside' }));
    fireEvent.click(screen.getByRole('button', { name: 'outside' }));

    expect(onClickOutside).toHaveBeenCalledTimes(1);
  });

  it('Should call onClickOutside again for a click after a touch', () => {
    const onClickOutside = jest.fn();
    render(<Harness onClickOutside={onClickOutside} />);

    fireEvent.touchEnd(screen.getByRole('button', { name: 'outside' }));
    fireEvent.click(screen.getByRole('button', { name: 'outside' }));
    fireEvent.click(screen.getByRole('button', { name: 'outside' }));

    expect(onClickOutside).toHaveBeenCalledTimes(2);
  });
});
