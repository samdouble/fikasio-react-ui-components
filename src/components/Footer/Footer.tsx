import React, { JSX } from 'react';
import classNames from 'classnames';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Footer.scss';

export interface FooterProps {
  childrenLeft?: JSX.Element[];
  childrenCenter?: JSX.Element[];
  childrenRight?: JSX.Element[];
  childrenTop?: JSX.Element[];
  className?: string;
  style?: React.CSSProperties;
}

export function Footer({
  childrenLeft = [],
  childrenCenter = [],
  childrenRight = [],
  childrenTop = [],
  className = '',
  style = {},
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
      <div className="fikasio-footer-container">
        <div className="fikasio-footer-row fikasio-footer-row-top">
          <div className="fikasio-footer-col fikasio-footer-col-full">
            <div className="fikasio-footer-content-center">
              {
                childrenTop?.map(element => (
                  <div key={element.key}>{element}</div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="fikasio-footer-row fikasio-footer-row-bottom">
          <div className="fikasio-footer-col fikasio-footer-col-third">
            <div className="fikasio-footer-content-left">
              {
                childrenLeft?.map(element => (
                  <div key={element.key}>{element}</div>
                ))
              }
            </div>
          </div>
          <div className="fikasio-footer-col fikasio-footer-col-third">
            <div className="fikasio-footer-content-center">
              {
                childrenCenter?.map(element => (
                  <div key={element.key}>{element}</div>
                ))
              }
            </div>
          </div>
          <div className="fikasio-footer-col fikasio-footer-col-third">
            <div className="fikasio-footer-content-right">
              {
                childrenRight?.map(element => (
                  <div key={element.key}>{element}</div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
