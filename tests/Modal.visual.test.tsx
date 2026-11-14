import React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import { Modal } from '../src';

test.describe('Modal', () => {
  test('Renders normally', async ({ mount, page }, testInfo) => {
    testInfo.snapshotSuffix = '';
    await mount(
      <Modal
        isOpen
        title="Check the form"
        variant="warning"
      >
        A few fields still need attention before you can save.
      </Modal>,
    );
    await expect(page.getByRole('dialog')).toHaveScreenshot('modal.png');
  });
});
