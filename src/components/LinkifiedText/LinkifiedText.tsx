import React from 'react';
import { linkify } from '../../utils/linkify';
import './LinkifiedText.css';

export interface LinkifiedTextProps {
  text: string;
}

export function LinkifiedText({ text }: LinkifiedTextProps) {
  return (
    <>
      {
        linkify(text).map((segment, index) => (
          segment.type === 'link' ? (
            <a
              className="fikasio-linkified-text-link"
              href={segment.href}
              key={`${segment.href}-${index}`}
              onClick={event => event.stopPropagation()}
              rel="noopener noreferrer"
              target="_blank"
            >
              {segment.value}
            </a>
          ) : (
            <React.Fragment key={`text-${index}`}>
              {segment.value}
            </React.Fragment>
          )
        ))
      }
    </>
  );
}

export default LinkifiedText;
