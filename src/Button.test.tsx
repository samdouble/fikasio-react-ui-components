import React from 'react';
import { describe, it, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import { Button } from '.';

describe('Button', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(
      <Button.Action>
        Click me
      </Button.Action>,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('Uses the given type and accessible name', () => {
    const { getByRole } = render(
      <Button.Action
        ariaLabel="Close"
        type="button"
      >
        x
      </Button.Action>,
    );
    const button = getByRole('button', { name: 'Close' });
    expect(button.getAttribute('type')).toBe('button');
  });

  it('Renders success, danger, secondary, and link buttons', () => {
    const { getByRole } = render(
      <>
        <Button.Success>Save</Button.Success>
        <Button.Danger>Delete</Button.Danger>
        <Button.Danger outline size="sm">Remove</Button.Danger>
        <Button.Secondary active>List</Button.Secondary>
        <Button.Secondary>Cancel</Button.Secondary>
        <Button.Link disabled>Resend</Button.Link>
      </>,
    );

    const save = getByRole('button', { name: 'Save' });
    expect(save.className).toContain('fikasio-successbutton');
    expect(save.getAttribute('type')).toBe('submit');

    const deleteButton = getByRole('button', { name: 'Delete' });
    expect(deleteButton.className).toContain('fikasio-dangerbutton');
    expect(deleteButton.className).not.toContain('fikasio-button-outline');
    expect(deleteButton.getAttribute('type')).toBe('button');

    const remove = getByRole('button', { name: 'Remove' });
    expect(remove.className).toContain('fikasio-button-outline');
    expect(remove.className).toContain('fikasio-button-sm');

    const list = getByRole('button', { name: 'List' });
    expect(list.className).toContain('fikasio-secondarybutton');
    expect(list.className).toContain('fikasio-button-active');
    expect(list.getAttribute('aria-pressed')).toBe('true');

    const cancel = getByRole('button', { name: 'Cancel' });
    expect(cancel.getAttribute('aria-pressed')).toBeNull();
    expect(cancel.getAttribute('type')).toBe('button');

    const resend = getByRole('button', { name: 'Resend' });
    expect(resend.className).toContain('fikasio-linkbutton');
    expect(resend.hasAttribute('disabled')).toBe(true);
  });
});
