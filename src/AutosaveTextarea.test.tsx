import React from 'react';
import { render } from '@testing-library/react';
import { AutosaveTextarea } from '.';

describe('AutosaveTextarea', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(
      <AutosaveTextarea
        onSave={() => undefined}
      />,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
