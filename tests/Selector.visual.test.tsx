import React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import { Selector } from '../src';

const options = ['Option 1', 'Option 2', 'Option 3'];

test.describe('Selector', () => {
  test('Renders with options', async ({ mount }, testInfo) => {
    testInfo.snapshotSuffix = '';
    const component = await mount(
      <div style={{
        boxSizing: 'border-box',
        height: '120px',
        padding: '2rem',
        position: 'absolute',
        width: '400px',
      }}>
        <Selector options={options} />
      </div>
    );
    await expect(component).toHaveScreenshot('selector-with-options.png');
  });

  test('Renders with the menu open', async ({ mount }, testInfo) => {
    testInfo.snapshotSuffix = '';
    const component = await mount(
      <div style={{
        boxSizing: 'border-box',
        height: '250px',
        padding: '2rem',
        position: 'absolute',
        width: '400px',
      }}>
        <Selector options={options} />
      </div>
    );
    await component.locator('.fikasio-actionbutton').click();
    await expect(component.locator('.fikasio-selector-menu')).toBeVisible();
    await expect(component).toHaveScreenshot('selector-menu-open.png');
  });
});
