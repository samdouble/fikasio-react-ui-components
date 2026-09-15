import React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import { Success } from '../src';

test.describe('Success', () => {
  test('Renders normally', async ({ mount }, testInfo) => {
    testInfo.snapshotSuffix = '';
    const component = await mount(
      <div style={{
        height: 115,
        padding: '2rem',
        position: 'absolute',
        width: 400,
      }}>
        <Success>
          This is a success!
        </Success>
      </div>
    );
    await expect(component).toHaveScreenshot('success.png');
  });
});
