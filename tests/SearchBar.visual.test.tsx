import React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
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
