import React, { useLayoutEffect, useRef } from 'react';
import classNames from 'classnames';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './OtpInput.css';

export const OTP_LENGTH = 6;

export interface OtpInputProps {
  autoFocus?: boolean;
  className?: string;
  disabled?: boolean;
  label?: string;
  name?: string;
  onChange: (code: string) => void;
  style?: React.CSSProperties;
  value: string;
}

const sanitizeOtp = (raw: string) => (
  raw.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, OTP_LENGTH)
);

const slotsFrom = (value: string) => (
  Array.from({ length: OTP_LENGTH }, (_, i) => value[i] ?? '')
);

export function OtpInput({
  autoFocus = false,
  className = '',
  disabled = false,
  label = 'Code',
  name = 'code',
  onChange,
  style = {},
  value,
}: OtpInputProps) {
  const theme = useTheme();
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const slots = slotsFrom(value);

  useLayoutEffect(() => {
    if (!autoFocus) {
      return;
    }
    const input = inputsRef.current[0];
    input?.focus();
    input?.select();
  }, [autoFocus]);

  const focusIndex = (index: number) => {
    const nextIndex = Math.max(0, Math.min(OTP_LENGTH - 1, index));
    const input = inputsRef.current[nextIndex];
    input?.focus();
    input?.select();
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = sanitizeOtp(event.clipboardData.getData('text'));
    if (!pasted) {
      return;
    }
    onChange(pasted);
    focusIndex(Math.min(pasted.length, OTP_LENGTH) - 1);
  };

  const handleChange = (index: number, raw: string) => {
    const sanitized = sanitizeOtp(raw);
    if (sanitized.length > 1) {
      onChange(sanitized);
      focusIndex(Math.min(sanitized.length, OTP_LENGTH) - 1);
      return;
    }
    const next = slotsFrom(value);
    next[index] = sanitized;
    onChange(next.join(''));
    if (sanitized) {
      focusIndex(index + 1);
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      if (slots[index]) {
        const next = slotsFrom(value);
        next[index] = '';
        onChange(next.join(''));
        return;
      }
      event.preventDefault();
      if (index > 0) {
        const next = slotsFrom(value);
        next[index - 1] = '';
        onChange(next.join(''));
        focusIndex(index - 1);
      }
      return;
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      focusIndex(index - 1);
      return;
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      focusIndex(index + 1);
    }
  };

  return (
    <div
      className={classNames({
        'fikasio-otp-input': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      style={style}
    >
      {
        slots.map((slot, index) => (
          <input
            aria-label={`${label} ${index + 1}`}
            autoCapitalize="characters"
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            autoCorrect="off"
            className="fikasio-otp-input-digit"
            disabled={disabled}
            inputMode="text"
            key={index}
            maxLength={index === 0 ? OTP_LENGTH : 1}
            name={index === 0 ? name : undefined}
            onChange={event => handleChange(index, event.target.value)}
            onFocus={event => event.target.select()}
            onKeyDown={event => handleKeyDown(index, event)}
            onPaste={handlePaste}
            ref={element => {
              inputsRef.current[index] = element;
            }}
            spellCheck={false}
            type="text"
            value={slot}
          />
        ))
      }
    </div>
  );
}

export default OtpInput;
