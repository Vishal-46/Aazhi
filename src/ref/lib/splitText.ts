// Faithful TS port of the reference utils/splitText.js.
// Splits an element's text into char or word spans, preserving spaces.

export interface SplitTextOptions {
  type?: string;
  charsClass?: string;
  wordsClass?: string;
}

export class SplitText {
  element: HTMLElement | null;
  type: string;
  charsClass: string;
  wordsClass: string;
  chars: HTMLElement[];
  words: HTMLElement[];

  constructor(
    element: string | HTMLElement | null,
    options: SplitTextOptions = {},
  ) {
    this.element =
      typeof element === 'string' ? document.querySelector(element) : element;
    this.type = options.type ?? 'chars';
    this.charsClass = options.charsClass ?? 'char';
    this.wordsClass = options.wordsClass ?? 'word';

    this.chars = [];
    this.words = [];

    if (this.element) {
      this.split();
    }
  }

  static create(
    element: string | HTMLElement | null,
    options: SplitTextOptions = {},
  ): SplitText {
    return new SplitText(element, options);
  }

  split(): void {
    if (!this.element) return;
    const types = this.type.split(',').map((t) => t.trim());

    if (types.includes('chars')) {
      this.splitChars();
    } else if (types.includes('words')) {
      this.splitWords();
    }
  }

  splitChars(): void {
    if (!this.element) return;
    const text = this.element.textContent ?? '';
    this.element.innerHTML = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const span = document.createElement('span');
      span.className = this.charsClass;
      span.style.display = 'inline-block';
      span.textContent = char === ' ' ? '\u00A0' : char; // non-breaking space
      this.element.appendChild(span);
      this.chars.push(span);
    }
  }

  splitWords(): void {
    const el = this.element;
    if (!el) return;
    const text = el.textContent ?? '';
    const words = text.split(/\s+/);
    el.innerHTML = '';

    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.className = this.wordsClass;
      span.style.display = 'inline-block';
      span.textContent = word;
      el.appendChild(span);
      this.words.push(span);

      // Add space between words (except last word)
      if (index < words.length - 1) {
        el.appendChild(document.createTextNode(' '));
      }
    });
  }

  revert(): void {
    if (this.element && this.element.textContent) {
      const text = this.element.textContent;
      this.element.innerHTML = text;
    }
  }
}
