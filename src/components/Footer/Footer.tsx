import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
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
      <Container
        fluid
      >
        <Row
          style={{
            backgroundColor: '#2e2e2e',
            paddingTop: 25,
          }}
        >
          <Col md={12}>
            <div className="text-center">
              {
                childrenTop?.map(element => (
                  <div key={element.key}>{element}</div>
                ))
              }
            </div>
          </Col>
        </Row>
        <Row
          style={{
            backgroundColor: '#2e2e2e',
            paddingBottom: 25,
          }}
        >
          <Col md={4}>
            <div className="text-left">
              {
                childrenLeft?.map(element => (
                  <div key={element.key}>{element}</div>
                ))
              }
            </div>
          </Col>
          <Col md={4}>
            <div className="text-center">
              {
                childrenCenter?.map(element => (
                  <div key={element.key}>{element}</div>
                ))
              }
            </div>
          </Col>
          <Col md={4}>
            <div className="text-right">
              {
                childrenRight?.map(element => (
                  <div key={element.key}>{element}</div>
                ))
              }
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

Footer.propTypes = {
  childrenLeft: PropTypes.arrayOf(PropTypes.element),
  childrenCenter: PropTypes.arrayOf(PropTypes.element),
  childrenRight: PropTypes.arrayOf(PropTypes.element),
  childrenTop: PropTypes.arrayOf(PropTypes.element),
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Footer;
