import React from 'react';
import useAutosave from '../../hooks/useAutosave';
import LinkifiedTextarea from '../LinkifiedTextarea/LinkifiedTextarea';

export interface AutosaveLinkifiedTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value'> {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSave?: (value: string) => void;
  value?: string;
}

const AutosaveLinkifiedTextarea = React.forwardRef<
  HTMLTextAreaElement,
  AutosaveLinkifiedTextareaProps
>(({
  onBlur,
  onChange,
  onFocus,
  onSave,
  value = '',
  ...rest
}, ref) => {
  const text = value ?? '';
  const {
    onBlur: saveOnBlur,
    onChange: saveOnChange,
    onFocus: saveOnFocus,
  } = useAutosave({
    commitExternalValue: true,
    onSave,
    value: text,
  });

  return (
    <LinkifiedTextarea
      {...rest}
      onBlur={event => {
        saveOnBlur();
        onBlur?.(event);
      }}
      onChange={event => {
        saveOnChange(event.target.value);
        onChange(event);
      }}
      onFocus={event => {
        saveOnFocus();
        onFocus?.(event);
      }}
      plain
      ref={ref}
      value={text}
    />
  );
});

AutosaveLinkifiedTextarea.displayName = 'AutosaveLinkifiedTextarea';

export default AutosaveLinkifiedTextarea;
