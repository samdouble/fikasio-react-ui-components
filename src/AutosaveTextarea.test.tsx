import React from 'react';
import renderer from 'react-test-renderer';
import { AutosaveTextarea } from '.';

describe('AutosaveTextarea', () => {
  it('Renders correctly', () => {
    const componentJSON = renderer.create(
      <AutosaveTextarea
        onSave={() => undefined}
      />,
    ).toJSON();
    expect(componentJSON).toMatchSnapshot();
  });
});
