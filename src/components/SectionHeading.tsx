import { useId } from 'react';
import Reveal from './Reveal';

interface SectionHeadingProps {
  /** @deprecated Ignored. Kept optional so existing callers keep compiling. */
  index?: string;
  eyebrow: string;
  title: string;
  lede?: string;
  /** 'light' (paper bg) or 'dark' (ink bg). Defaults to light. */
  tone?: 'light' | 'dark';
  /** id applied to the heading element for aria-labelledby. Auto-generated when omitted. */
  headingId?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = 'light',
  headingId,
}: SectionHeadingProps) {
  const autoId = useId();
  // Always render an id so parent `aria-labelledby` has a target.
  const id = headingId ?? autoId;
  return (
    <Reveal>
      <div className="azh-heading" data-theme={tone}>
        <p className="azh-heading__eyebrow">{eyebrow}</p>
        <h2 className="azh-heading__title" id={id}>
          {title}
        </h2>
        {lede ? <p className="azh-heading__lede">{lede}</p> : null}
      </div>
    </Reveal>
  );
}
