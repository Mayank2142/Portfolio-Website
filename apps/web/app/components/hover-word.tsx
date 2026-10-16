import type { CSSProperties } from 'react';

export function HoverWord({ text }: { text: string }) {
  let index = 0;
  return (
    <span className="hover-word">
      <span className="word-accessible">{text}</span>
      <span aria-hidden="true">
        {text.split(' ').map((word, wordIndex) => (
          <span key={wordIndex}>
            {wordIndex > 0 && ' '}
            <span className="hover-token">
              {[...word].map((letter, letterIndex) => (
                <span
                  key={letterIndex}
                  className="hover-letter"
                  style={{ '--letter-delay': `${index++ * 35}ms` } as CSSProperties}
                >
                  {letter}
                </span>
              ))}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
