import { measureAutoHeight } from './useAutoResize';

describe('measureAutoHeight', () => {
  const field = document.createElement('textarea');

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockComputedStyle = (style: Partial<CSSStyleDeclaration>) => {
    jest.spyOn(window, 'getComputedStyle').mockReturnValue({
      borderBottomWidth: '0px',
      borderTopWidth: '0px',
      boxSizing: 'content-box',
      maxHeight: 'none',
      paddingBottom: '0px',
      paddingTop: '0px',
      ...style,
    } as CSSStyleDeclaration);
  };

  it('adds the border for a border-box field', () => {
    Object.defineProperty(field, 'scrollHeight', { configurable: true, value: 33 });
    mockComputedStyle({
      borderBottomWidth: '1px',
      borderTopWidth: '1px',
      boxSizing: 'border-box',
      paddingBottom: '6px',
      paddingTop: '6px',
    });

    expect(measureAutoHeight(field)).toEqual({ height: 35, overflowY: 'hidden' });
  });

  it('subtracts padding for a content-box field', () => {
    Object.defineProperty(field, 'scrollHeight', { configurable: true, value: 40 });
    mockComputedStyle({
      boxSizing: 'content-box',
      paddingBottom: '4px',
      paddingTop: '8px',
    });

    expect(measureAutoHeight(field)).toEqual({ height: 28, overflowY: 'hidden' });
  });

  it('scrolls once the content is taller than max-height', () => {
    Object.defineProperty(field, 'scrollHeight', { configurable: true, value: 80 });
    mockComputedStyle({
      boxSizing: 'border-box',
      maxHeight: '40px',
    });

    expect(measureAutoHeight(field)).toEqual({ height: 80, overflowY: 'auto' });
  });

  it('does not shrink below zero when padding exceeds the content', () => {
    Object.defineProperty(field, 'scrollHeight', { configurable: true, value: 4 });
    mockComputedStyle({
      paddingBottom: '8px',
      paddingTop: '8px',
    });

    expect(measureAutoHeight(field).height).toBe(0);
  });

  it('keeps a short field at least minRows tall', () => {
    Object.defineProperty(field, 'scrollHeight', { configurable: true, value: 21 });
    mockComputedStyle({
      borderBottomWidth: '1px',
      borderTopWidth: '1px',
      boxSizing: 'border-box',
      lineHeight: '21px',
      paddingBottom: '6px',
      paddingTop: '6px',
    });

    expect(measureAutoHeight(field, { minRows: 2 })).toEqual({
      height: 56,
      minHeight: 56,
      overflowY: 'hidden',
    });
  });

  it('caps the field at maxRows and scrolls the rest', () => {
    Object.defineProperty(field, 'scrollHeight', { configurable: true, value: 100 });
    mockComputedStyle({
      boxSizing: 'content-box',
      lineHeight: '20px',
    });

    expect(measureAutoHeight(field, { maxRows: 2 })).toEqual({
      height: 40,
      maxHeight: 40,
      overflowY: 'auto',
    });
  });

  it('lets maxRows win when it is smaller than minRows', () => {
    Object.defineProperty(field, 'scrollHeight', { configurable: true, value: 20 });
    mockComputedStyle({
      boxSizing: 'content-box',
      lineHeight: '20px',
    });

    expect(measureAutoHeight(field, { maxRows: 2, minRows: 4 })).toEqual({
      height: 40,
      maxHeight: 40,
      minHeight: 40,
      overflowY: 'hidden',
    });
  });
});
