import React from 'react';
import renderer from 'react-test-renderer';
import { Error } from '.';

describe('Error', () => {
  it('Renders correctly', () => {
    const componentJSON = renderer.create(
      <Error>
        This is an error
      </Error>
    ).toJSON();
    expect(componentJSON).toMatchSnapshot();
  });
});
