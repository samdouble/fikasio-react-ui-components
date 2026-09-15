import React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import { Breadcrumb } from '../src';

const items = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { label: 'Project A' },
];

test.describe('Breadcrumb', () => {
  test('Renders a breadcrumb trail', async ({ mount }, testInfo) => {
    testInfo.snapshotSuffix = '';
    const component = await mount(
      <div style={{
        boxSizing: 'border-box',
        height: '100px',
        padding: '2rem',
        position: 'absolute',
        width: '500px',
      }}>
        <Breadcrumb items={items} />
      </div>
    );
    await expect(component).toHaveScreenshot('breadcrumb-default.png');
  });

  test('Renders with a custom separator', async ({ mount }, testInfo) => {
    testInfo.snapshotSuffix = '';
    const component = await mount(
      <div style={{
        boxSizing: 'border-box',
        height: '100px',
        padding: '2rem',
        position: 'absolute',
        width: '500px',
      }}>
        <Breadcrumb
          items={items}
          separator=">"
        />
      </div>
    );
    await expect(component).toHaveScreenshot('breadcrumb-custom-separator.png');
  });
});
