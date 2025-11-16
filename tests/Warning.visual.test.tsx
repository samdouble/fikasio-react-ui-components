import React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import { Warning } from '../src';

test.describe('Warning', () => {
  test('Renders normally', async ({ mount }, testInfo) => {
    testInfo.snapshotSuffix = '';
    const component = await mount(
      <div style={{
        height: 115,
        padding: '2rem',
        position: 'absolute',
        width: 400,
      }}>
        <Warning>
          This is a warning!
        </Warning>
      </div>
    );
    await expect(component).toHaveScreenshot('warning.png');
  });
});
