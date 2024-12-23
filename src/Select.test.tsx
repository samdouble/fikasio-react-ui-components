import React from 'react';
import { render } from '@testing-library/react';
import { Select } from '.';

describe('Select', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(
      <Select
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ]}
      />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
