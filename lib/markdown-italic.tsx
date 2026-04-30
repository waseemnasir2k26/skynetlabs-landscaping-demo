import * as React from "react";

/**
 * Converts `text *with italic* parts` into React fragments with
 * <em class="italic font-display"> wrapping italic segments.
 *
 * Usage:
 *   renderItalic('A smile, *sculpted* in Manhattan.')
 *   → ['A smile, ', <em>sculpted</em>, ' in Manhattan.']
 */
export function renderItalic(text: string, emClassName = "italic font-display"): React.ReactNode {
  const parts = text.split(/\*([^*]+)\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className={emClassName}>
        {part}
      </em>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
}
