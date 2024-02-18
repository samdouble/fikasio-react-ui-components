import React from 'react';
import DatePicker, { DatePickerProps } from '../components/DatePicker/DatePicker';

const story = {
  title: 'DatePicker',
  component: DatePicker,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
};

function Template({
  className,
  dateFormat,
  defaultValue,
  displayFormat,
  isOpen,
  name,
  onChange,
  onClose,
  onRemoveValue,
  shouldCloseOnSelect,
  showRemoveValue,
  showTimeSelect,
  style,
  timeCaption,
  timeFormat,
  timeIntervals,
  value,
}: DatePickerProps) {
  return (
    <DatePicker
      className={className}
      dateFormat={dateFormat}
      defaultValue={defaultValue}
      displayFormat={displayFormat}
      isOpen={isOpen}
      name={name}
      onChange={onChange}
      onClose={onClose}
      onRemoveValue={onRemoveValue}
      shouldCloseOnSelect={shouldCloseOnSelect}
      showRemoveValue={showRemoveValue}
      showTimeSelect={showTimeSelect}
      style={style}
      timeCaption={timeCaption}
      timeFormat={timeFormat}
      timeIntervals={timeIntervals}
      value={value}
    />
  );
}

export const DatePickerWithDefaultValue = Template.bind({});
DatePickerWithDefaultValue.args = {
  defaultValue: new Date(),
};

export default story;
