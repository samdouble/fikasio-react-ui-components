export type TextSegment =
  | { type: 'text'; value: string }
  | { type: 'link'; href: string; value: string };

const CLOSER_TO_OPENER: Record<string, string> = {
  ')': '(',
  ']': '[',
  '}': '{',
};

const countChar = (value: string, char: string) => {
  let count = 0;
  for (const current of value) {
    if (current === char) {
      count += 1;
    }
  }
  return count;
};

const withoutTrailingPunctuation = (raw: string) => {
  let display = raw;
  while (display.length > 0) {
    const last = display[display.length - 1];
    if (/[.,;:!?]/.test(last)) {
      display = display.slice(0, -1);
      continue;
    }
    const opener = CLOSER_TO_OPENER[last];
    if (opener && countChar(display, last) > countChar(display, opener)) {
      display = display.slice(0, -1);
      continue;
    }
    break;
  }
  return display;
};

const toHttpUrl = (value: string) => {
  if (!value) {
    return null;
  }
  const withProtocol = /^www\./i.test(value) ? `https://${value}` : value;
  try {
    const url = new URL(withProtocol);
    if ((url.protocol !== 'http:' && url.protocol !== 'https:') || !url.hostname) {
      return null;
    }
    return url.href;
  } catch {
    return null;
  }
};

export const linkify = (text: string): TextSegment[] => {
  if (!text) {
    return [];
  }

  const segments: TextSegment[] = [];
  let cursor = 0;
  for (const match of text.matchAll(/(?:https?:\/\/|www\.)[^\s<>"']+/gi)) {
    const raw = match[0];
    const index = match.index ?? 0;
    const display = withoutTrailingPunctuation(raw);
    const href = toHttpUrl(display);
    if (!href) {
      continue;
    }
    if (index > cursor) {
      segments.push({ type: 'text', value: text.slice(cursor, index) });
    }
    segments.push({ type: 'link', href, value: display });
    cursor = index + display.length;
  }
  if (cursor < text.length) {
    segments.push({ type: 'text', value: text.slice(cursor) });
  }
  return segments;
};
