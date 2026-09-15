import React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import { Tabs } from '../src';

const options = [
  { content: 'Overview of the current workspace.', label: 'Overview', value: 'overview' },
  { content: 'Additional details and metadata.', label: 'Details', value: 'details' },
  { content: 'Workspace settings.', label: 'Settings', value: 'settings' },
];

test.describe('Tabs', () => {
  test('Renders with the first tab selected', async ({ mount }, testInfo) => {
    testInfo.snapshotSuffix = '';
    const component = await mount(
      <div style={{
        padding: '2rem',
        position: 'absolute',
        width: '500px',
      }}>
        <Tabs options={options} />
      </div>
    );
    await expect(component).toHaveScreenshot('tabs-first-selected.png');
  });

  test('Renders with a selected tab', async ({ mount }, testInfo) => {
    testInfo.snapshotSuffix = '';
    const component = await mount(
      <div style={{
        padding: '2rem',
        position: 'absolute',
        width: '500px',
      }}>
        <Tabs
          options={options}
          value="details"
        />
      </div>
    );
    await expect(component).toHaveScreenshot('tabs-second-selected.png');
  });
});
