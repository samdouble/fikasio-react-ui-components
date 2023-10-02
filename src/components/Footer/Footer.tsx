import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Footer.scss';

export interface FooterProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Footer({
  className,
  style,
}: FooterProps) {
  const theme = useTheme();

  return (
    <div
      className={classNames({
        'fikasio-footer': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      style={style}
    >
    </div>
  );
}

Footer.propTypes = {
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
Footer.defaultProps = {
  className: '',
  style: {},
};

export default Footer;
