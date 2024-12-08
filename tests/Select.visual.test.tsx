import React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import { Select } from '../src';

test.describe('Select', () => {
  test('Renders with two options', async ({ mount }, testInfo) => {
    testInfo.snapshotSuffix = '';
    const component = await mount(
      <div style={{ 
        padding: '2rem',
        width: '400px',
      }}>
        <Select
          options={[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
          ]}
        />
      </div>
    );
    // await component.waitFor({ state: 'visible' });
    // await page.goto('http://localhost:3000/')
    await expect(component).toHaveScreenshot('select-with-two-options.png');
  });

  test('Renders with a default value', async ({ mount }, testInfo) => {
    testInfo.snapshotSuffix = '';
    const component = await mount(
      <div style={{ 
        padding: '2rem',
        width: '400px',
      }}>
        <Select
          options={[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
          ]}
          value="1"
        />
      </div>
    );
    // await expect(component).toContainText('Learn React');
    // await page.waitForSelector('.fikasio-select');
    await expect(component).toHaveScreenshot('select-with-default-value.png');
  });
});
