import { linkify } from './linkify';

const linkText = (text: string) => linkify(text).map(segment => (
  segment.type === 'link' ? segment.href : segment.value
));

describe('linkify', () => {
  it('leaves text without a url unchanged', () => {
    expect(linkify('Ship the launch')).toEqual([
      { type: 'text', value: 'Ship the launch' },
    ]);
  });

  it('turns http and https urls into links', () => {
    expect(linkify('See https://fikas.io/docs and http://example.com/a')).toEqual([
      { type: 'text', value: 'See ' },
      { type: 'link', href: 'https://fikas.io/docs', value: 'https://fikas.io/docs' },
      { type: 'text', value: ' and ' },
      { type: 'link', href: 'http://example.com/a', value: 'http://example.com/a' },
    ]);
  });

  it('prefixes www urls with https', () => {
    expect(linkText('www.fikas.io/pricing')).toEqual(['https://www.fikas.io/pricing']);
  });

  it('keeps sentence punctuation outside the link', () => {
    expect(linkify('Read https://fikas.io/docs.')).toEqual([
      { type: 'text', value: 'Read ' },
      { type: 'link', href: 'https://fikas.io/docs', value: 'https://fikas.io/docs' },
      { type: 'text', value: '.' },
    ]);
  });

  it('keeps wrapping parentheses outside the link and parentheses in the path', () => {
    expect(linkify('(https://en.wikipedia.org/wiki/URL_(disambiguation))')).toEqual([
      { type: 'text', value: '(' },
      {
        type: 'link',
        href: 'https://en.wikipedia.org/wiki/URL_(disambiguation)',
        value: 'https://en.wikipedia.org/wiki/URL_(disambiguation)',
      },
      { type: 'text', value: ')' },
    ]);
  });

  it('does not link javascript urls', () => {
    expect(linkify('javascript:alert(1)')).toEqual([
      { type: 'text', value: 'javascript:alert(1)' },
    ]);
  });

  it('returns nothing for an empty string', () => {
    expect(linkify('')).toEqual([]);
  });
});
