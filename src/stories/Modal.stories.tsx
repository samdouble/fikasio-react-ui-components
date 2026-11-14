import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '../components/Button/Button';
import Modal from '../components/Modal/Modal';

const meta = {
  title: 'Modal',
  component: Modal,
  argTypes: {
    className: { control: 'text' },
    closeLabel: { control: 'text' },
    dismissible: { control: 'boolean' },
    isOpen: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'lg', 'xl'],
    },
    staticBackdrop: { control: 'boolean' },
    style: { control: 'object' },
    title: { control: 'text' },
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
      ],
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ModalDialog: Story = {
  args: {
    children: 'Save these changes to the project?',
    footer: <Button.Action>Save</Button.Action>,
    isOpen: true,
    title: 'Save changes',
  },
};

export const ModalWarning: Story = {
  args: {
    children: 'A few fields still need attention before you can save.',
    isOpen: true,
    title: 'Check the form',
    variant: 'warning',
  },
};

export const ModalWithTrigger: Story = {
  args: {
    children: 'A few fields still need attention before you can save.',
    isOpen: false,
    title: 'Check the form',
    variant: 'warning',
  },
  render: function ModalWithTriggerStory(args) {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button.Action
          onClick={() => setIsOpen(true)}
          type="button"
        >
          Open modal
        </Button.Action>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </>
    );
  },
};
