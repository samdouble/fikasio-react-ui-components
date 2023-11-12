import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ContentEditable from 'react-contenteditable';
import useTimeout from 'use-timeout';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './style.scss';

interface AutosaveTextareaProps {
  className?: string;
  defaultValue?: string;
  onBlur?: any;
  onFocus?: any;
  onKeyDown?: any;
  onKeyUp?: any;
  onSave: (value: string) => void;
  ref?: React.Ref<any>,
  style?: React.CSSProperties;
  useContentEditableDiv?: boolean;
}

function AutosaveTextarea({
  className,
  defaultValue,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  onSave,
  ref,
  style,
  useContentEditableDiv,
}: AutosaveTextareaProps) {
  const [value, setIValue] = useState(defaultValue ? defaultValue.toString() : '');
  const [delay, setDelay] = useState<number | null>(null);

  const theme = useTheme();

  const saveValue = () => {
    if (value !== '') {
      onSave(value);
    }
  };

  useTimeout(() => {
    saveValue();
    setDelay(null);
  }, delay);

  const setValue = val => {
    setDelay(1000);
    setIValue(val);
  };

  return useContentEditableDiv
    ? (
      <ContentEditable
        className={classNames({
          'fikasio-textarea': true,
          'fikasio-theme-dark': theme === 'dark',
          'fikasio-theme-light': theme === 'light',
          ...convertClassNameToObj(className),
        })}
        html={value}
        onBlur={e => onBlur && onBlur(e)}
        onChange={e => setValue(e.target.value)}
        onClick={e => e.stopPropagation()}
        onFocus={e => onFocus && onFocus(e)}
        onKeyDown={e => onKeyDown && onKeyDown(e)}
        onKeyUp={e => onKeyUp && onKeyUp(e)}
        ref={ref}
        style={{
          whiteSpace: 'pre',
          ...style,
        }}
      />
    ) : (
      <textarea
        className={className}
        defaultValue={value}
        onBlur={e => onBlur(e)}
        onChange={e => setValue(e.target.value)}
        onClick={e => e.stopPropagation()}
        onFocus={e => onFocus(e)}
        onKeyDown={e => onKeyDown(e)}
        onKeyUp={e => onKeyUp(e)}
        ref={ref}
        style={{
          ...style,
        }}
      />
    );
}

AutosaveTextarea.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onSave: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  useContentEditableDiv: PropTypes.bool,
};
AutosaveTextarea.defaultProps = {
  className: '',
  defaultValue: undefined,
  onBlur: () => undefined,
  onFocus: () => undefined,
  onKeyDown: () => undefined,
  onKeyUp: () => undefined,
  onSave: () => undefined,
  ref: undefined,
  style: {},
  useContentEditableDiv: true,
};

export default AutosaveTextarea;
