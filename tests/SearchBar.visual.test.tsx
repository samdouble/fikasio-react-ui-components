import React from 'react';
import { test } from '@playwright/experimental-ct-react';
import { expect } from '@playwright/test';
import { SearchBar } from '../src';

test.describe('Search Bar', () => {
  test('Renders normally', async ({ mount }, testInfo) => {
    testInfo.snapshotSuffix = '';
    const component = await mount(
      <div style={{
        height: '200px',
        padding: '2rem',
        position: 'absolute',
        width: '400px',
      }}>
        <SearchBar />
      </div>
    );
    await expect(component).toHaveScreenshot('search-bar.png');
  });
});
