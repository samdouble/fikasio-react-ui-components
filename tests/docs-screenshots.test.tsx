import React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import {
  AutosaveTextarea,
  Breadcrumb,
  Button,
  Checkbox,
  DatePicker,
  Dot,
  Error,
  Footer,
  Icon,
  Input,
  SearchBar,
  Select,
  Selector,
  Success,
  Tabs,
  Warning,
} from '../src';

const README_ICON_NAMES = [
  'archive',
  'bars',
  'bell',
  'book',
  'bullseye',
  'calendar-alt',
  'caret-left',
  'caret-right',
  'check',
  'check-square',
  'clock',
  'cog',
  'copy',
  'download',
  'edit',
  'ellipsis',
  'list',
  'magnifying-glass',
  'message',
  'plus',
  'power-off',
  'project-diagram',
  'shapes',
  'sitemap',
  'sliders',
  'stopwatch',
  'th',
  'times',
  'user',
] as const;

const frameStyle = (size?: { height?: number; width?: number }): React.CSSProperties => ({
  backgroundColor: '#ffffff',
  boxSizing: 'border-box',
  color: '#333333',
  display: size?.height || size?.width ? 'block' : 'inline-block',
  fontFamily: "Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif",
  padding: 16,
  ...size,
});

test.describe('README screenshots', () => {
  test('AutosaveTextarea', async ({ mount }) => {
    const component = await mount(
      <div style={frameStyle({ width: 480 })}>
        <AutosaveTextarea
          defaultValue="This textarea saves automatically after you stop typing."
          onSave={() => undefined}
          style={{
            border: '1px solid #dddddd',
            height: 120,
          }}
        />
      </div>
    );
    await expect(component).toHaveScreenshot('autosave-textarea.png');
  });

  test('Breadcrumb', async ({ mount }) => {
    const component = await mount(
      <div style={frameStyle()}>
        <Breadcrumb
          items={[
            { href: '/', label: 'Home' },
            { href: '/projects', label: 'Projects' },
            { label: 'Project A' },
          ]}
        />
      </div>
    );
    await expect(component).toHaveScreenshot('breadcrumb.png');
  });

  test('Button', async ({ mount }) => {
    const component = await mount(
      <div style={frameStyle()}>
        <Button.Action>Save</Button.Action>
      </div>
    );
    await expect(component).toHaveScreenshot('button.png');
  });

  test('Checkbox', async ({ mount }) => {
    const component = await mount(
      <div style={frameStyle()}>
        <div style={{ alignItems: 'center', display: 'flex', gap: 24 }}>
          <div style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
            <Checkbox />
            <span>Unchecked</span>
          </div>
          <div style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
            <Checkbox defaultIsChecked />
            <span>Checked</span>
          </div>
        </div>
      </div>
    );
    await expect(component).toHaveScreenshot('checkbox.png');
  });

  test('DatePicker', async ({ mount }) => {
    const component = await mount(
      <div style={frameStyle({ height: 340, width: 340 })}>
        <DatePicker
          defaultValue={new Date(2026, 7, 31)}
          isOpen
          showTimeSelect={false}
        />
      </div>
    );
    await expect(component).toHaveScreenshot('datepicker.png');
  });

  test('Dot', async ({ mount }) => {
    const component = await mount(
      <div style={frameStyle()}>
        <div style={{ alignItems: 'center', display: 'flex' }}>
          <Dot color="#0078FF" size={16} />
          <Dot color="#1E871E" size={16} />
          <Dot color="#BF3838" size={16} />
        </div>
      </div>
    );
    await expect(component).toHaveScreenshot('dot.png');
  });

  test('Error', async ({ mount }) => {
    const component = await mount(
      <div style={frameStyle({ width: 420 })}>
        <Error>Something went wrong</Error>
      </div>
    );
    await expect(component).toHaveScreenshot('error.png');
  });

  test('Footer', async ({ mount }) => {
    const component = await mount(
      <div style={frameStyle({ height: 160, width: 800 })}>
        <Footer
          childrenCenter={[<div key="2">Center</div>]}
          childrenLeft={[<div key="1">Left</div>]}
          childrenRight={[<div key="3">Right</div>]}
          childrenTop={[<div key="4">Top</div>]}
          style={{ position: 'relative' }}
        />
      </div>
    );
    await expect(component).toHaveScreenshot('footer.png');
  });

  test('Icon', async ({ mount }) => {
    const component = await mount(
      <div style={frameStyle({ width: 640 })}>
        <div
          style={{
            display: 'grid',
            gap: 16,
            gridTemplateColumns: 'repeat(7, 1fr)',
          }}
        >
          {README_ICON_NAMES.map(name => (
            <div
              key={name}
              style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                fontSize: 11,
                gap: 8,
                textAlign: 'center',
              }}
            >
              <Icon name={name} size="lg" />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    );
    await expect(component).toHaveScreenshot('icon.png');
  });

  test('Input', async ({ mount }) => {
    const component = await mount(
      <div style={frameStyle({ width: 360 })}>
        <Input placeholder="Enter a name" />
      </div>
    );
    await expect(component).toHaveScreenshot('input.png');
  });

  test('SearchBar', async ({ mount }) => {
    const component = await mount(
      <div style={frameStyle({ height: 160, width: 360 })}>
        <SearchBar
          options={['Option 1', 'Option 2', 'Option 3']}
          placeholder="Search"
        />
      </div>
    );
    await component.locator('.fikasio-searchbar-input').click();
    await expect(component.locator('.fikasio-searchbar-dropdown')).toBeVisible();
    await expect(component).toHaveScreenshot('search-bar.png');
  });

  test('Select', async ({ mount }) => {
    const component = await mount(
      <div style={frameStyle({ height: 150, width: 280 })}>
        <Select
          defaultValue="1"
          options={[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
          ]}
        />
      </div>
    );
    await component.locator('.fikasio-select-input-wrapper').click();
    await expect(component.locator('.fikasio-select-menu')).toBeVisible();
    await expect(component).toHaveScreenshot('select.png');
  });

  test('Selector', async ({ mount }) => {
    const component = await mount(
      <div style={frameStyle({ height: 170, width: 280 })}>
        <Selector options={['Option 1', 'Option 2', 'Option 3']} />
      </div>
    );
    await component.locator('.fikasio-actionbutton').click();
    await expect(component.locator('.fikasio-selector-menu')).toBeVisible();
    await expect(component).toHaveScreenshot('selector.png');
  });

  test('Success', async ({ mount }) => {
    const component = await mount(
      <div style={frameStyle({ width: 420 })}>
        <Success>This is a success!</Success>
      </div>
    );
    await expect(component).toHaveScreenshot('success.png');
  });

  test('Tabs', async ({ mount }) => {
    const component = await mount(
      <div style={frameStyle({ width: 480 })}>
        <Tabs
          defaultValue="overview"
          options={[
            {
              content: 'Overview of the current workspace.',
              label: 'Overview',
              value: 'overview',
            },
            {
              content: 'Additional details and metadata.',
              label: 'Details',
              value: 'details',
            },
            {
              content: 'Workspace settings.',
              label: 'Settings',
              value: 'settings',
            },
          ]}
        />
      </div>
    );
    await expect(component).toHaveScreenshot('tabs.png');
  });

  test('Warning', async ({ mount }) => {
    const component = await mount(
      <div style={frameStyle({ width: 420 })}>
        <Warning>This is a warning!</Warning>
      </div>
    );
    await expect(component).toHaveScreenshot('warning.png');
  });
});
