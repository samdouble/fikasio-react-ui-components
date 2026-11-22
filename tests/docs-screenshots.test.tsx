import React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import {
  Breadcrumb,
  Button,
  Checkbox,
  DatePicker,
  Dot,
  Dropdown,
  Error,
  Footer,
  Icon,
  Input,
  Modal,
  OtpInput,
  SearchBar,
  Select,
  Selector,
  Success,
  Tabs,
  Textarea,
  UserAvatar,
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
  'trash',
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
  test('Textarea', async ({ mount }) => {
    const component = await mount(
      <div style={frameStyle({ width: 480 })}>
        <Textarea
          defaultValue="This textarea saves automatically after you stop typing."
          onSave={() => undefined}
          style={{
            border: '1px solid #dddddd',
            height: 120,
          }}
        />
      </div>
    );
    await expect(component).toHaveScreenshot('textarea.png');
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
    const samples = [
      { label: 'Action', node: <Button.Action type="button">Save</Button.Action> },
      { label: 'Success', node: <Button.Success type="button">Save</Button.Success> },
      { label: 'Danger', node: <Button.Danger type="button">Delete</Button.Danger> },
      { label: 'Secondary', node: <Button.Secondary type="button">Cancel</Button.Secondary> },
      { label: 'Outline', node: <Button.Danger outline type="button">Remove</Button.Danger> },
      { label: 'Link', node: <Button.Link type="button">Resend</Button.Link> },
    ];
    const component = await mount(
      <div style={frameStyle()}>
        <div style={{ alignItems: 'start', display: 'flex', gap: 16 }}>
          {samples.map(sample => (
            <div key={sample.label} style={{ textAlign: 'center' }}>
              {sample.node}
              <div style={{ color: '#777777', fontSize: 12, marginTop: 8 }}>{sample.label}</div>
            </div>
          ))}
        </div>
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

  test('Dropdown', async ({ mount }) => {
    const component = await mount(
      <div style={frameStyle({ height: 200, width: 280 })}>
        <Dropdown show>
          <Dropdown.Toggle>Actions</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Edit</Dropdown.Item>
            <Dropdown.Item active>Duplicate</Dropdown.Item>
            <Dropdown.Item>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
    await expect(component).toHaveScreenshot('dropdown.png');
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

  test('Modal', async ({ mount, page }) => {
    await page.setViewportSize({ width: 640, height: 360 });
    await mount(
      <Modal
        isOpen
        title="Check the form"
      >
        A few fields still need attention before you can save.
      </Modal>,
    );
    await expect(page).toHaveScreenshot('modal.png');
  });

  test('OtpInput', async ({ mount }) => {
    const component = await mount(
      <div style={frameStyle()}>
        <OtpInput
          onChange={() => undefined}
          value="AB12CD"
        />
      </div>
    );
    await expect(component).toHaveScreenshot('otp-input.png');
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

  test('UserAvatar', async ({ mount }) => {
    const component = await mount(
      <div style={frameStyle()}>
        <div style={{ alignItems: 'center', display: 'flex', gap: 16 }}>
          <UserAvatar size={32} />
          <UserAvatar size={48} />
          <UserAvatar size={72} />
        </div>
      </div>
    );
    await expect(component).toHaveScreenshot('user-avatar.png');
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
