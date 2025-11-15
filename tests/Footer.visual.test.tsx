import React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import { Footer } from '../src';

test.describe('Footer', () => {
  test('Renders normally', async ({ mount }, testInfo) => {
    testInfo.snapshotSuffix = '';
    const component = await mount(
      <div style={{
        height: '200px',
        padding: '2rem',
        position: 'absolute',
        width: '1000px',
      }}>
        <Footer
          childrenLeft={[<div key="1">Child 1</div>]}
          childrenCenter={[<div key="2">Child 2</div>]}
          childrenRight={[<div key="3">Child 3</div>]}
          childrenTop={[<div key="4">Child 4</div>]}
        />
      </div>
    );
    await expect(component).toHaveScreenshot('footer.png');
  });
});
